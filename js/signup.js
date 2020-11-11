$(document).ready(function () {

    $('#button2').on('click', function (event) {
        event.preventDefault();

        let user = {
            // firstName: $('#firstName').val().trim(),
            // lastName: $('#lastName').val().trim(),
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        };

        if (!user.email || !user.password) {
            return;
        }

        else {
            $.ajax({
                url: '/api/signUp',
                method: 'POST',
                data: user,
            }).then(function(userId) {
                window.location.replace('/profile/' + userId);
            }).catch(function(err) {
                $('#alert .msg').text(err.responseJSON);
                $('#alert').fadeIn(500);
            });
        }
    });
});