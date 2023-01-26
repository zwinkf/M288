/** Javascript Datei mit Funktionen zur Simulation des Servers */

/** Erstellen Userliste, welche im Memory gehalten und als DB für alle registrierten User genutzt wird. */
let userList = new Array();

/** Funktion zur Suche eines Users in Userliste nach username oder email.
 * @return User Objekt als JSON falls vorhanden, null wenn User nicht existiert. */
function findUser(username, email) {
    for (let i = 0; i < userList.length; i++) {
        if(userList[i].user.username==username || userList[i].user.email==email)
            return userList[i];
    }
    return null;
}

/** Login Funktion des Servers.
 * Username und Paswort werden als JSON übergeben.
 * @return JSON Objekt mit responscode (OK oder ERROR) und Fehlermeldung */
function login(jsonReq) {
    // Erstellen JSON Response Nachricht.
    let jsonResp = {
        "responsecode": "OK",
        "messsage": ""
    };
    /** Suchen User in DB, Suchen mit username oder email */
    let existingUser = findUser(jsonReq.usernameOrEmail, jsonReq.usernameOrEmail);
    /** Anpassen JSON Response je nachdem ob Login erfolgreich oder nicht. */
    if (existingUser != null &&
        ((jsonReq.usernameOrEmail==existingUser.user.username || jsonReq.usernameOrEmail==existingUser.user.email)
            && jsonReq.password==existingUser.user.password)){
        jsonResp.messsage = "Login with user '"+jsonReq.usernameOrEmail+"' was successful!";
    } else {
        jsonResp.responsecode = "ERROR";
        jsonResp.messsage = "Login unsuccessful, invalid username or password!"
    }
    // Rückgabe JSON Response */
    return jsonResp;
}

/** Funktion zum Erstellen neuen Benutzeraccount im Server */
function createAccount(jsonReq) {
    // Erstellen JSON Response Nachricht.
    let jsonResp = {
        "responsecode": "OK",
        "messsage": ""
    };
    /** Suchen User in DB, Suchen mit username oder email */
    let existingUser = findUser(jsonReq.user.username, jsonReq.user.email);
    /** Anpassen JSON Response je nachdem ob Erstellung User Account erfolgreich oder nicht. */
    if(existingUser==null) {
        /** erstelle neuen Benutzer in Liste */
        userList.push(jsonReq);
    } else {
        jsonResp.responsecode = "ERROR";
        if (existingUser.user.username==jsonReq.user.username)
            jsonResp.messsage = "User "+jsonReq.user.username+" already exists!";
        else
            jsonResp.messsage = "User with "+jsonReq.user.email+" already exists!";
    }
    // Rückgabe JSON Response */
    return jsonResp;
}
