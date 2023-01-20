/** Hilfsmethoden Validierung */

/** Funktion zur Validierung einer gültigen E-Mail Adresse */
function validateEmail(email) {
        if(email.length < 7) {
            return false;
        } else if (email.indexOf("@")<0) {
            return false;
        } else if (email.indexOf(".")<0) {
            return false;
        } else if (email.indexOf("@") > email.lastIndexOf(".")) {
            return false;
        } else if (email.lastIndexOf(".") - email.indexOf("@")<3) {
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
        loginForm.classList.remove("form--hidden");
        resetForm.classList.add("form--hidden");
    });

    /** Abfrage Link Betätigung (Create Account back to Login) und Anzeige des Formulars  */
    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });


    /** Funktion die auf alle Inputfields reagiert */
    document.querySelectorAll(".form__input").forEach(inputElement => {
        /** Beim Verlassen des Inputfields auf Gültigkeit überprüfen */
        inputElement.addEventListener("blur", e => {
            /** Prüfung Inputfields Formular Create Account */
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6) {
                setInputError(inputElement, "Username must be at least 6 characters in length");
            }
            if (e.target.id === "signupEmail" && e.target.value.length > 0) {
                if(!validateEmail(e.target.value))
                    setInputError(inputElement, "Please enter a valid Email Address!");
            }
            if (e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInputError(inputElement, "Password must be at least 8 characters in length");
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

        setFormMessage(loginForm, "success", "Submit pressed");
    });

    /** Code wird ausgeführt wenn Create Account Form Submitted wird */
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        let usernameField = document.querySelector("#signupUsername");
        if(usernameField.value.length > 0 && usernameField.value.length < 10)
            setInputError(usernameField, "Username must be at least 10 characters in length");
        else
            setFormMessage(createAccountForm, "error", "Submit pressed!");
    });

    /** Code wird ausgeführt wenn Password Reset Submitted wird */
    resetForm.addEventListener("submit", e => {
        e.preventDefault();

        setFormMessage(resetForms, "success", "Submit pressed");
    });
});

/* funktion json */
function validateAllInputs() {
    if (!checkRequired([username, password])) {
        alert(
            'Login erfolgreich'
        );
    }
    validateForm();
}