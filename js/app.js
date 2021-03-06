const btnEnviar = document.querySelector('#enviar');

const error = document.querySelectorAll('.error');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const resetBtn = document.querySelector('#resetBtn');


addEventListeners();

function addEventListeners(){
    //Arranca la app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Validamos los campos
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    //Enviar el e-mail

    formulario.addEventListener('submit', enviarEmail);
}

function iniciarApp() {
    formulario.reset();
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
    e.preventDefault();
    if (e.target.value.length > 0){

        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }
    else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
    if (e.target.type === 'email') {

        if (er.test( e.target.value )) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }
        else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no v??lido');
        }
    }
    
    if (er.test(email.value) && mensaje.value !== '' && asunto.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');

    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

}


function enviarEmail(e){
    e.preventDefault();
    //Mostrar el spinner
    const spinner = document.querySelector('#spinner');

    spinner.style.display = 'flex';

    //Despu??s de 3 segundos ocultar el spinner y mostrar mensaje

    setTimeout(() => {
        spinner.style.display = 'none';

        //Mensaje
        const parrafo = document.createElement('p');

        parrafo.textContent = 'El mensaje se envi?? correctamente';

        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Inserta el parrafo antes del spinner

        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 5000);
    }, 3000);

    
}

//Resetear el formulario
resetBtn.addEventListener('click', resetearFormulario)
function resetearFormulario() {
    iniciarApp();
    formulario.reset();
}
