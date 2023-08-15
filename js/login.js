const btnSingIn = document.getElementById('sing-in');
const btnSingUp = document.getElementById('sing-up');
const formRegister = document.querySelector('.register');
const formLogin = document.querySelector('.login');

btnSingIn.addEventListener('click', x => {
    formRegister.classList.add('hide');
    formLogin.classList.remove('hide');
});

btnSingUp.addEventListener('click', x => {
    formLogin.classList.add('hide');
    formRegister.classList.remove('hide');
});

let btnRegistrarse = document.getElementById('btnRegister');

btnRegistrarse.addEventListener('click', (e) => {
    e.preventDefault();
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('userEmail').value;
    let pass1 = document.getElementById('pass1').value;
    let pass2 = document.getElementById('pass2').value;


    if (userName.trim() === '' || email.trim() === '' || pass1 === '' || pass2 !== pass1 || pass1.length < 6) {
        alert('Los datos ingresados no son correctos');
    } else {
        let user = {
            userName, email, pass1//encriptar
        };
        let data = {
            user,
        };

        // Guardar los datos en el localStorage
        localStorage.setItem('userData', JSON.stringify(data));

        alert('Bienvenido ' + userName + '!!');
        window.location = 'index.html';
    }
});






/* 
*/
