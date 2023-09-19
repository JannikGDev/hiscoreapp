import { SetLoggedIn, GetJWTKey } from './GlobalStorage.js'

const API_BASE_URL = 'https://app.hi-score.org/api';

const SendRequest = async (url, method, headers, body, onSuccessMessage = "Action successful", deleteContentType = false) => {

  let accept = 'application/json';

  if(headers['Accept']) {
    accept = headers['Accept'];
  }

  const options = {
    method: method,
    headers: {
      ...headers,
      'Accept': accept,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With"
    },
    body: body,
  };
  if (deleteContentType) {
    delete options.headers['Content-Type'];
  }


  const response = await fetch(url, options).catch(error => {
    console.error(error);
    return { message: error, success: false, statusCode: 400 };
  });

  let statusCode = response.status;

  if (statusCode == 502 || statusCode == 503 || statusCode == 404) {
    console.error("UNABLE TO CONNECT TO API");
    return { message: "Could not connect to companion API Server", success: false, statusCode: statusCode };
  }

  if (statusCode == 401) {
    //console.error("UNAUTHORIZED");
    return { message: "Invalid authorization", success: false, statusCode: statusCode };
  }

  if (!response.ok) {
    let error = await response.text();
    //console.log("Request Error response: ");
    //console.log(error);
    return { message: error, success: false, statusCode: statusCode };
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

  const request_url = API_BASE_URL + '/Login/register';

  let data = JSON.stringify({
    username: userName,
    password: password,
    mail: mail
  });
  let result = await SendRequest(request_url, 'POST', { 'Content-Type': 'application/json' }, data, "Registrierung erfolgreich! ");

  return result;
};

export const Login = async (userName, password) => {
  const request_url = API_BASE_URL + '/Login/login';

  let data = JSON.stringify({
    username: userName,
    password: password
  });

  let result = await SendRequest(request_url, 'POST', { 'Content-Type': 'application/json' }, data, "");

  if (result.success)
    await SetLoggedIn(result.response);

  return result;
};

export const PasswordResetRequest = async (mail) => {
  const request_url = API_BASE_URL + '/PasswordReset/request';

  let data = JSON.stringify({
    Mail: mail,
  });

  let result = await SendRequest(request_url, 'POST', { 'Content-Type': 'application/json' }, data, "E-Mail zum Passwort-Reset wurde versendet.");
  return result;
};

export const PasswordResetSubmit = async (code, newPassword) => {
  const request_url = API_BASE_URL + '/PasswordReset/submit';

  let data = JSON.stringify({
    Code: code,
    NewPassword: newPassword
  });

  let result = await SendRequest(request_url, 'POST', { 'Content-Type': 'application/json' }, data, "Password geändert.");
  return result;
};


export const GetUserData = async () => {
  const request_url = API_BASE_URL + '/User';

  let key = await GetJWTKey();
  if (key == null || key.length == 0)
    return { success: false, message: "Nicht eingeloggt!" };

  let headers = { 'Authorization': 'Bearer ' + key };
  var result = await SendRequest(request_url, 'GET', headers, null);
  return result;
};

export const ScanCode = async (code) => {
  const request_url = API_BASE_URL + '/Quest';

  let data = JSON.stringify({
    code: code,
  });

  let key = await GetJWTKey();
  if (key == null || key.length == 0)
    return { success: false, message: "Nicht eingelogt!" };

  let headers = { 'Authorization': 'Bearer ' + key };

  let result = await SendRequest(request_url, 'POST', { ...headers, 'Content-Type': 'application/json' }, data, "Quest abgeschlossen!");
  return result;
};

export const GetQuests = async () => {
  const request_url = API_BASE_URL + '/Quest/questlist';

  let key = await GetJWTKey();
  if (key == null || key.length == 0)
    return { success: false, message: "Nicht eingelogt!" };

  let headers = { 'Authorization': 'Bearer ' + key };
  var result = await SendRequest(request_url, 'GET', headers, null);
  return result;
};

export const GetImage = async (imageId) => {
  const request_url = API_BASE_URL + '/Image?imageId=' + imageId;

  let headers = {};

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
      return { message: error, success: false };
    });

  let blob = await response.blob();
  let base64 = await blobToBase64(blob);
  let result = {response: {byte64: base64}, success: true};
  return result;
}

export const UploadHighscore = async (gameId, categoryId, imageUri, score) => {
  const request_url = API_BASE_URL + '/Highscore/SaveHighscore?gameId=' + gameId + '&categoryid=' + categoryId + '&score=' + score;

  //console.log({ id: gameId, score: score, uri: imageUri });

  let key = await GetJWTKey();
  if (key == null || key.length == 0)
    return { success: false, message: "Nicht eingeloggt!" };

  let headers = {
    'Authorization': 'Bearer ' + key,
  };

  let blob = dataURItoBlob(imageUri);

  const image = {
    uri: imageUri,
    type: 'image/png',
    name: 'highscore' + '_' + Date.now() + '.png'
  };

  console.log(blob);

  const formData = new FormData();
  formData.append('imageFile', blob);

  console.log(formData);

  var result = await SendRequest(request_url, 'POST', headers, formData, "success", true);
  return result;
};


export const GetGames = async () => {
  const request_url = API_BASE_URL + '/Game/gamelist';

  var result = await SendRequest(request_url, 'GET', {}, null);
  return result;
};

export const GetHighscores = async (gameId, categoryId, userId) => {
  let request_url = API_BASE_URL + '/Highscore/GetHighscores?gameid=' + gameId + '&categoryid=' + categoryId;
  if(userId != null) {
    request_url += '&userid=' + userId;
  }

  var result = await SendRequest(request_url, 'GET', {}, null);
  return result;
};

export const GetHighscoresTopTen = async (gameId, categoryId) => {
  const request_url = API_BASE_URL + '/Highscore/GetHighscoresTopTen?gameid=' + gameId + '&categoryid=' + categoryId;

  var result = await SendRequest(request_url, 'GET', {}, null);
  return result;
};

export const GetHighscoresTopTenThisMonth = async (gameId, categoryId) => {
  const request_url = API_BASE_URL + '/Highscore/GetHighscoresTopTenCurrentMonth?gameid=' + gameId + '&categoryid=' + categoryId;

  var result = await SendRequest(request_url, 'GET', {}, null);
  return result;
};

export const GenerateQRCode = async (taskId) => {
  const request_url = API_BASE_URL + '/Quest/qrcode?id=' + taskId;

  let key = await GetJWTKey();
  if (key == null || key.length == 0)
    return { success: false, message: "Not logged in!" };

  let headers = { 'Authorization': 'Bearer ' + key };

  const response = await fetch(request_url, {
    method: "GET",
    headers: {
      ...headers,
      'Accept': 'image/*',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With"
    },
    body: null,
  })
    .catch(error => {
      console.error(error);
      return { message: error, success: false };
    });

  let blob = await response.blob();
  var base64 = await blobToBase64(blob);


  return { message: 'QR Code erfolgreich generiert', success: true, image: base64 };
};

async function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};


export const ChangeAvatar = async (newAvatarNum) => {
  const request_url = API_BASE_URL + '/User/avatar?avatarNumber=' + newAvatarNum;

  let key = await GetJWTKey();
  if (key == null || key.length == 0)
    return { success: false, message: "Not logged in!" };

  let headers = { 'Authorization': 'Bearer ' + key };
  var result = await SendRequest(request_url, 'POST', headers, {});
  return result;
};


const dataURItoBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

