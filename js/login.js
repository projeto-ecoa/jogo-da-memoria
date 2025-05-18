const input = document.querySelector('.login-input');
const button = document.querySelector('.login-botao');
const form = document.querySelector('.login-form');

const validateInput = ({target}) => {
    if (target.value.length > 2){
        button.removeAttribute('disabled');
        return;
    }

    button.setAttribute('disabled', '');
}

input.addEventListener('input', validateInput);

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);

    window.location = 'paginas/jogo.html';
}

form.addEventListener('submit', handleSubmit);