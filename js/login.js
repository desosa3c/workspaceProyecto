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
    formRegister.classList.remove('hide')
});

