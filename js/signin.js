function initApp() {
    // Login with Email/Password
    var txtEmail = document.getElementById('inputEmail');
    var txtPassword = document.getElementById('inputPassword');
    var btnLogin = document.getElementById('btnLogin');
    var btnGoogle = document.getElementById('btngoogle');
    var btnSignUp = document.getElementById('btnSignUp');

    btnLogin.addEventListener('click', function () {
        /// TODO 2: Add email login button event
        ///         1. Get user input email and password to login
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert" and clean input field
        
        firebase.auth().signInWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then(function (result) {
            window.location.href = "index.html";            
        })
        .catch(function (error) {
            create_alert("error", "Email and Password sign in Error");
        });
        
    });

    btnGoogle.addEventListener('click', function () {
        /// TODO 3: Add google login button event
        ///         1. Use popup function to login google
        ///         2. Back to index.html when login success
        ///         3. Show error message by "create_alert"
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function (result) {

        })
        .catch(function (error) {

        });
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function (result) {

        })
        .catch(function (error) {

        });
    });

    btnSignUp.addEventListener('click', function () {        
        /// TODO 4: Add signup button event
        ///         1. Get user input email and password to signup
        ///         2. Show success message by "create_alert" and clean input field
        ///         3. Show error message by "create_alert" and clean input field
        firebase.auth().createUserWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then(function (result) {
            create_alert("success", "Email and Password Sign Up Success");
        })
        .catch(function (error) {
            create_alert("error", "Email and Password Sign Up Error");
        });
        txtEmail.value = "";
        txtPassword.value = "";
    });
}

// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    } else if (type == "error") {
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        alertarea.innerHTML = str_html;
    }
}

window.onload = function () {
    initApp();
};