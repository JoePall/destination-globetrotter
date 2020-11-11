$(document).ready(function() {

    let loginNav = $('#loginNav')

    loginNav.on('click', function (event) {
        event.preventDefault();

        let loginBtn = $('#popupBtn');
        loginListener(loginBtn)
    })

    function loginListener(loginBtn) {
         loginBtn.on('click', function (event) {
             event.preventDefault();

             let passwordInput = $('password').val();
             let emailInput = $('email').val();

             let userData = {
                 email: emailInput,
                 password: passwordInput
             };

             if (!userData.email || !userData.password) {
                 return;
             }

             loginUser(userData.email, userData.password);
             $('#email').val("");
             $('#password').val("");
         });
    };

    function loginUser(email, password) {
        $.post('/api/login', {
            email: email,
            password: password
        })

        .then(function (id) {
            window.location.replace('/profile')
        })

        .catch(function (err) {
            console.log(err);
        });
    }
});