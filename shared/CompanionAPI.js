import { SetLoggedIn, GetJWTKey } from './GlobalStorage.js'

const API_BASE_URL = 'https://continue.sodacookie.net/api';

const SendRequest = async (url, method, headers, body, onSuccessMessage = "Action successful") => {

  const response = await fetch(url, {
    method: method,
    headers: {
      ...headers,
      'Accept': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With"
    },
    body: body,
  }).catch(error => {
    console.error(error);
    return {message: error, success: false, statusCode: 400};
  });

  let statusCode = response.status;
  
  if(statusCode == 502 || statusCode == 503 || statusCode == 404){
    console.error("UNABLE TO CONNECT TO API");
    return {message: "Could not connect to companion API Server", success: false, statusCode: statusCode};
  }

  if(statusCode == 401){
    //console.error("UNAUTHORIZED");
    return {message: "Invalid authorization", success: false, statusCode: statusCode};
  }

  if(!response.ok){
    let error = await response.json();
    //console.log("Request Error response: ");
    //console.log(error);
    return {message: error, success: false, statusCode: statusCode};
  }



  let responseBody = await response.json();
  //console.log("Request Response Body: ");
  //console.log(responseBody);
  let result = {
    success: true,
    message: onSuccessMessage,
    response: responseBody,
    statusCode: statusCode
  };
  return result;
}

export const Register = async (userName, password, mail) => {

  const request_url = API_BASE_URL+'/Login/register';

  let data = JSON.stringify({
      username: userName,
      password: password,
      mail: mail
    });

  let result = await SendRequest(request_url, 'POST', {'Content-Type': 'application/json'}, data, "Account was registered!");

  return result;
};

export const Login = async (userName, password) => {
  const request_url = API_BASE_URL+'/Login/login';

  let data = JSON.stringify({
      username: userName,
      password: password
    });

  let result = await SendRequest(request_url, 'POST', {'Content-Type': 'application/json'}, data, "");

  if(result.success)
    await SetLoggedIn(result.response);

  return result;
};

export const PasswordResetRequest = async (mail) => {
  const request_url = API_BASE_URL+'/PasswordReset/request';

  let data = JSON.stringify({
    Mail: mail,
  });

  let result = await SendRequest(request_url, 'POST', {'Content-Type': 'application/json'}, data, "Password reset mail sent.");
  return result;
};

export const PasswordResetSubmit = async (code, newPassword) => {
  const request_url = API_BASE_URL+'/PasswordReset/submit';

  let data = JSON.stringify({
    Code: code,
    NewPassword: newPassword
  });

  let result = await SendRequest(request_url, 'POST', {'Content-Type': 'application/json'}, data,  "Password was changed.");
  return result;
};



export const GetUserData = async () => {
  const request_url = API_BASE_URL+'/User';

  let key = await GetJWTKey();
  if(key == null || key.length == 0)
    return {success: false, message: "Not logged in!"};

  let headers = {'Authorization': 'Bearer '+key};
  var result = await SendRequest(request_url, 'GET', headers, null);
  return result;
};

export const ScanCode = async (code) => {
  const request_url = API_BASE_URL+'/Quest';

  let data = JSON.stringify({
    code: code,
  });

  let key = await GetJWTKey();
  if(key == null || key.length == 0)
    return {success: false, message: "Not logged in!"};

  let headers = {'Authorization': 'Bearer '+key};

  let result = await SendRequest(request_url, 'POST', {...headers, 'Content-Type': 'application/json'}, data,  "Quest completed!");
  return result;
};

export const GetQuests = async () => {
  const request_url = API_BASE_URL+'/Quest/questlist';

  let key = await GetJWTKey();
  if(key == null || key.length == 0)
    return {success: false, message: "Not logged in!"};

  let headers = {'Authorization': 'Bearer '+key};
  var result = await SendRequest(request_url, 'GET', headers, null);
  return result;
};

export const GetGames = async () => {
  const request_url = API_BASE_URL+'/Game/gamelist';

  var result = await SendRequest(request_url, 'GET', {}, null);
  return result;
};

export const GenerateQRCode = async (questId) => {
  const request_url = API_BASE_URL+'/Quest/qrcode?id=' + questId;

  let key = await GetJWTKey();
  if(key == null || key.length == 0)
    return {success: false, message: "Not logged in!"};

  let headers = {'Authorization': 'Bearer '+key};

  const response = await fetch(request_url, {
    method: "GET",
    headers: {
      ...headers,
      'Accept': 'image/png',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With"
    },
    body: null,
  })
  .catch(error => {
    console.error(error);
    return {message: error, success: false};
  });

  let blob = await response.blob();
  var base64 = await blobToBase64(blob);


  return {message: 'QR Code generated successfully', success: true, image: base64};
};

async function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};


export const ChangeAvatar = async (newAvatarNum) => {
  const request_url = API_BASE_URL+'/User/avatar?avatarNumber=' + newAvatarNum;

  let key = await GetJWTKey();
  if(key == null || key.length == 0)
    return {success: false, message: "Not logged in!"};

  let headers = {'Authorization': 'Bearer '+key};
  var result = await SendRequest(request_url, 'POST', headers, {});
  return result;
};


