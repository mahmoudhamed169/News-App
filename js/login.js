
var usersinfo = [];
let currentAcount;

if (localStorage.getItem("usersInfo") == null) {
    usersinfo = [];
} else {
    usersinfo = JSON.parse(localStorage.getItem("usersInfo"));
}
console.log(usersinfo);

$('#login').click(function (e) { 
    e.preventDefault();
    // alert('welcome');
    let loginEmail = $('#loginEmail').val(); 
    let loginPassword = $('#loginPassword').val();

    if (!loginEmail || !loginPassword) {
        $('#wrongMsg').removeClass('d-none').addClass('d-block').text('Please fill the required fields');
    } else {
        $('#loginEmail, #loginPassword').keyup(function (e) { 
            if ($('#wrongMsg').hasClass("d-block")) {
                $('#wrongMsg').removeClass('d-block').addClass('d-none');
            }            
        });
        let currentAccount = usersinfo.find(user => user.email.toLowerCase() === loginEmail.toLowerCase());
        if(!currentAccount) {
            $('#wrongMsg').removeClass('d-none').addClass('d-block').text('Email does not exist');
        } else {
            if (currentAccount.password === loginPassword) {
                Swal.fire({
                    title: `Welcome, ${currentAccount.name}!`,
                    text: 'You have successfully logged in.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "home.html";
                    }
                })

                // window.location.href = "home.html";
            } else {
                $('#wrongMsg').removeClass('d-none').addClass('d-block').text('Password is incorrect');
            }
        }
    }
});

