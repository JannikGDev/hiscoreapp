import Storage from '../shared/Storage.js'
const jwtKey = "jwt";

async function save(key, value) {
    await Storage.save({key: key, data: JSON.stringify(value)});
}
  
async function getValueFor(key) {
    return await Storage.load({key: key})
    .then(value => {
        return JSON.parse(value);
    })
    .catch(error => {
        return null;
    });
}

export const GetJWTKey = async () => {
    var tokenObject = await getValueFor(jwtKey);
    if(!tokenObject || !tokenObject.token || !tokenObject.expiration)
        return null;
    
    return tokenObject.token;
}

export const IsLoggedIn = async () => {
    let tokenObject = await getValueFor(jwtKey);

    if(!tokenObject || !tokenObject.token || !tokenObject.expiration)
        return false;

    let expirationDate = new Date(tokenObject.expiration);
    let now = new Date();
    if(now > expirationDate)
        return false;

    return true;
}

export const SetLoggedIn = async (tokenObject) => {
    await save(jwtKey,tokenObject);
}

export const LogOut = async () => {
    await Storage.remove({key:jwtKey});
}