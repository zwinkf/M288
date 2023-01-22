/** Konstanten */
const MIN_LENGTH_PASSWORD = 8;
const MIN_LENGTH_USERNAME = 6;

/** Hilfsmethoden Validierung */

/** Funktion zur Validierung einer gültigen E-Mail Adresse.
 * @return true, wenn Email gültig ist, false wenn nicht. */
function validateEmail(email) {
    // mindestlänge 7: a@ch.ch
    if(email.length < 7) {
        return false;
    // mindetens 1 @ Zeichen
    } else if (email.indexOf("@")<0) {
        return false;
    // mindestens 1 . wegen domain (z.B. gmx.ch)
    } else if (email.indexOf(".")<0) {
        return false;
    // nach dem @ hat es noch ein Punkt (z.B. username@gmx.ch)
    } else if (email.indexOf("@") > email.lastIndexOf(".")) {
        return false;
    // mindestlänge Domain ist 2/2 (sp: ch.ch)
    } else if (email.lastIndexOf(".") - email.indexOf("@")<3) {
        return false;
    } else if (email.length - email.lastIndexOf(".")<3) {
        return false;
    }
    return true;
}

/** Funktion zur Anzeige Erfolgs- oder Fehlermeldung in einem Formular */
function setFormMessage(formElement, type, message) {
   const messageElement = formElement.querySelector(".form__message");
   messageElement.textContent = message;
   messageElement.classList.remove("form__message--success", "form__message--error");
   messageElement.classList.add('form__message--'+type);
}

/** Funktion zum Löchen einer Erfolgs- oder Fehlermeldung in einem Formular */
function clearFormMessage(formElement) {
    const messageElement = formElement.querySelector(".form__message");
    messageElement.textContent = "";
    messageElement.classList.remove("form__message--success", "form__message--error");
}

/** Funktion zu Anzeige Fehlermeldung Inputfield */
function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

/** Funktion Fehlermeldung zu Inputfield entfernen */
function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

/** Funktion um alle Inputfield Fehlermeldungen eines Formulars zurückzusetzen */
function clearInputfieldMessages(inputForm) {
    inputForm.querySelectorAll(".form__input").forEach(inputElement => {
        clearInputError(inputElement);
    });
}

/** Überprüfung Inputfields Create Account Form.
 * @return true, wenn alle Felder valide sind, false wenn ein Fehler aufgetreten ist. */
function validateCreateAccountForm() {
    // setzen return auf ture
    let returncode = true;
    // Prüfen username
    let usernameField = document.querySelector("#signupUsername");
    if(usernameField.value!=null && usernameField.value.length < MIN_LENGTH_USERNAME) {
        setInputError(usernameField, "Username must be at least "+MIN_LENGTH_USERNAME+" characters in length!");
        returncode = false;
    }
    // Prüfen Email
    let emailField = document.querySelector("#signupEmail");
    if(emailField.value!=null && !validateEmail(emailField.value)) {
        setInputError(emailField, "Please enter a valid email address!");
        returncode = false;
    }
    // Prüfen Passwort
    let passwordField = document.querySelector("#signupPassword");
    let password2Field = document.querySelector("#signupPassword2");
    if(passwordField.value!=null && passwordField.value.length < MIN_LENGTH_PASSWORD) {
        setInputError(passwordField, "Password must be at least "+MIN_LENGTH_PASSWORD+" characters in length!");
        returncode = false;
    }
    else if (passwordField.value!=password2Field.value) {
        setInputError(password2Field, "Passwords must be the same!");
        return false;
    }
    return returncode;
}

/** Hauptfunktion die auf alle Events (Tastatureingabe, Clicks, etc.) reagiert
 * und die entsprechenden Funktionen ausführt
 * */
document.addEventListener("DOMContentLoaded", () => {
    /** Konstanten für alle Formulare erzeugen */
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    const resetForm = document.querySelector("#resetPassword");

    /** Abfrage Link Betätigung (Create an Account) und Anzeige des Formulars  */
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        /** Zurücksetzen Create Account Formular vor der Anzeige */
        createAccountForm.reset();
        clearFormMessage(createAccountForm);
        clearInputfieldMessages(createAccountForm);
        /** Anzeigen CreateAccount Form und verstecken aktuelles Formular */
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    /** Abfrage Link Betätigung (Forgot Password) und Anzeige des Formulars  */
    document.querySelector("#forgotPassword").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        resetForm.classList.remove("form--hidden");
    });

    /** Abfrage Link Betätigung (Back to Login) und Anzeige des Formulars  */
    document.querySelector("#linkBack").addEventListener("click", e => {
        e.preventDefault();
        /** Zurücksetzen Login Formular vor der Anzeige */
        loginForm.reset();
        clearFormMessage(loginForm);
        /** Anzeigen Login Form und verstecken aktuelles Formular */
        loginForm.classList.remove("form--hidden");
        resetForm.classList.add("form--hidden");
    });

    /** Abfrage Link Betätigung (Create Account back to Login) und Anzeige des Formulars  */
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        /** Zurücksetzen Login Formular vor der Anzeige */
        loginForm.reset();
        clearFormMessage(loginForm);
        /** Anzeigen Login Form und verstecken aktuelles Formular */
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    /** Funktion die auf alle Inputfields reagiert */
    document.querySelectorAll(".form__input").forEach(inputElement => {
        /** Beim Verlassen des Inputfields auf Gültigkeit überprüfen */
        inputElement.addEventListener("blur", e => {
            /** Prüfung Inputfields Formular Create Account */
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < MIN_LENGTH_USERNAME) {
                setInputError(inputElement, "Username must be at least "+MIN_LENGTH_USERNAME+" characters in length!");
            }
            if (e.target.id === "signupEmail" && e.target.value.length > 0) {
                if(!validateEmail(e.target.value))
                    setInputError(inputElement, "Please enter a valid Email Address!");
            }
            if (e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < MIN_LENGTH_PASSWORD) {
                setInputError(inputElement, "Password must be at least "+MIN_LENGTH_PASSWORD+" characters in length!");
            }
            /** Prüfung Inputfields Formular Reset Password */
            if (e.target.id === "passwordEmail" && e.target.value.length > 0) {
                if(!validateEmail(e.target.value))
                    setInputError(inputElement, "Please enter a valid Email Address!");
            }
        });

        /** Löschen der Fehlermeldung in Inputfield bei Eingabe */
        inputElement.addEventListener("input", e => {
           clearInputError(inputElement);
        });
    });

    /** Code wird ausgeführt wenn Login Form Submitted wird */
    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        /** Erstellen JSON Request */
        let jsonReq = {
            "usernameOrEmail": loginForm.querySelector("#username").value,
            "password": loginForm.querySelector("#password").value
        }
        /** Aufruf Login Funktion am Server mit Übergabe JSON Request */
        const jsonResp = login(jsonReq);
        /** Auswerten JSON Response und Anzeigen Meldung */
        if(jsonResp.responsecode=="OK")
            setFormMessage(loginForm, "success", jsonResp.messsage);
        else
            setFormMessage(loginForm, "error", jsonResp.messsage);
    });

    /** Code wird ausgeführt wenn Create Account Form Submitted wird */
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        /** Prüfen, ob Inputfelder ausgefüllt und valide sind */
        if(validateCreateAccountForm()) {
            /** Erstellen JSON Request */
            let jsonReq = {
                "username": createAccountForm.querySelector("#signupUsername").value,
                "email": createAccountForm.querySelector("#signupEmail").value,
                "password": createAccountForm.querySelector("#signupPassword").value
            }
            /** Aufruf Login Funktion am Server mit Übergabe JSON Request */
            const jsonResp = createAccount(jsonReq);
            /** Auswerten JSON Response und Anzeigen Meldung */
            if (jsonResp.responsecode == "OK") {
                createAccountForm.reset();
                setFormMessage(createAccountForm, "success", "Account '"+jsonReq.username+"' has been created, please return to login page an login.");
            }
            else
                setFormMessage(createAccountForm, "error", jsonResp.messsage);
        }

    });

    /** Code wird ausgeführt wenn Password Reset Submitted wird */
    resetForm.addEventListener("submit", e => {
        e.preventDefault();
        // löschen alte Fehlermeldung
        clearFormMessage(resetForm);
        /** Prüfung Inputfields Formular Reset Password */
        let passwordEmail = resetForm.querySelector("#passwordEmail");
        if (passwordEmail.value!=null && !validateEmail(passwordEmail.value)) {
            setInputError(passwordEmail, "Please enter a valid Email Address!");
        } else
            setFormMessage(resetForm, "success", "Submit pressed, no function implemented yet!");
    });
});

