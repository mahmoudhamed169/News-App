var usersinfo = [];

if (localStorage.getItem("usersInfo") == null) {
    usersinfo = [];
} else {
    usersinfo = JSON.parse(localStorage.getItem("usersInfo"));
}

$('#register').click(function (e) {
    e.preventDefault();
    if (userInputsValidation() && !isExist()) {
        let user = {
            name: $('#registerName').val(),
            email: $('#registerEmail').val(),
            userName: $('#registerUserName').val(),
            country: $('#registerCountry').val(),
            phone: $('#registerPhone').val(),
            password: $('#registerPassword').val()
        };
        console.log(user);
        usersinfo.push(user);
        localStorage.setItem("usersInfo", JSON.stringify(usersinfo));       
        if ($('#tryAgainMsg').hasClass("d-block") || $('#accountExistMsg').hasClass("d-block")) {
            $('#tryAgainMsg, #accountExistMsg').removeClass('d-block').addClass('d-none');
        }
        
        $('#confirmMsg').removeClass('d-none').addClass('d-block');
        Swal.fire({
            title: `Welcome, ${user.name}!`,
            text: 'You have successfully register.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "index.html";
            }
        })
   
    } else {
        $('#tryAgainMsg').removeClass('d-none').addClass('d-block');
    }
});

function validateInput(inputField, regex, alertElement, errorMessage) {
    if (regex.test(inputField.val()) && inputField.val() != "") {
        inputField.addClass('is-valid').removeClass('is-invalid');
        alertElement.removeClass('d-block').addClass('d-none');
        return true;
    } else {
        inputField.addClass('is-invalid').removeClass('is-valid');
        alertElement.removeClass('d-none').addClass('d-block').text(errorMessage);
        return false;
    }
}

function validateName() {
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
    return validateInput($('#registerName'), regex, $('#nameAlert'), 'Name must be 3 to 10 characters long, alphabetic only.');
}
$('#registerName').on('keyup', validateName);

function validateCountry() {
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
    return validateInput($('#registerCountry'), regex, $('#countryAlert'), 'Country must be 3 to 10 characters long, alphabetic only.');
}
$('#registerCountry').on('keyup', validateCountry);

function validatePhoneNumber() {
    let regex = /^\d{11}$/;
    return validateInput($('#registerPhone'), regex, $('#phoneAlert'), 'Phone number must contain 11 digits.');
}
$('#registerPhone').on('keyup', validatePhoneNumber);

function usernameValidation() {
    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
    return validateInput($('#registerUserName'), regex, $('#usernameAlert'), 'Username must be 3 to 10 characters long, alphabetic only.');
}
$('#registerUserName').on('keyup', usernameValidation);

function userEmailValidation() {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validateInput($('#registerEmail'), regex, $('#userEmailAlert'), 'Please enter a valid email address.');
}
$('#registerEmail').on('keyup', userEmailValidation);

function userPasswordValidation() {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return validateInput($('#registerPassword'), regex, $('#userPasswordAlert'), 'Password must be 8 to 16 characters long, including at least one digit, one lowercase, and one uppercase letter.');
}
$('#registerPassword').on('keyup', userPasswordValidation);

function userConfirmdPasswordValidation() {
    let registerPassword = $('#registerPassword').val();
    if ($('#confirmPassword').val() === registerPassword) {
        $('#confirmPassword').addClass('is-valid').removeClass('is-invalid');
        $('#confirmPasswordAlert').removeClass('d-block').addClass('d-none');
        return true;
    } else {
        $('#confirmPassword').addClass('is-invalid').removeClass('is-valid');
        $('#confirmPasswordAlert').removeClass('d-none').addClass('d-block').text('Passwords do not match.');
        return false;
    }
}
$('#confirmPassword').on('keyup', userConfirmdPasswordValidation);

function isExist() {
    let accountExistMsg = $("#accountExistMsg");
    let userName = $('#registerUserName').val();
    let userEmail = $('#registerEmail').val();
    let usernameAlert = $('#usernameAlert');

    let userExists = usersinfo.some(function (user) {
        return user.userName.toLowerCase() === userName.toLowerCase() || user.email.toLowerCase() === userEmail.toLowerCase();
    });

    if (userExists) {
        accountExistMsg.removeClass("d-none").addClass("d-block");
        usernameAlert.removeClass('d-none').addClass('d-block').text('Username or email already exists');
        $("#registerUserName, #registerEmail, #registerPassword").removeClass("is-valid");
        return true;
    } else {
        usernameAlert.removeClass('d-block').addClass('d-none').text('');
    }

    return false;
}

function userInputsValidation() {
    let isValidName = validateName();
    let isValidEmail = userEmailValidation();
    let isValidPassword = userPasswordValidation();
    let isValidConfirmPassword = userConfirmdPasswordValidation();
    let isValidCountry = validateCountry();
    let isValidPhoneNumber = validatePhoneNumber();

    return (isValidName && isValidEmail && isValidPassword && isValidConfirmPassword && isValidCountry && isValidPhoneNumber);
}
