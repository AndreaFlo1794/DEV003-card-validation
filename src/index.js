import validator from './validator.js';

console.log(validator);

//nombre de la tarjeta variables//
let namecard = document.querySelector('.card__DatosNombre');
let nameInput = document.querySelector('#nombreDeTarjeta');
let nameError =document.querySelector('.form__inputnombredelatarjeta--error');

//numero de la tarjeta variables//
let numbercard = document.querySelector('.card__numeroDeTarjeta');
let numberInput = document.querySelector('#numerodetarjeta');
let numberError = document.querySelector('.form__inputNumerodelatajeta--error');

//mes de la tarjeta variable//
let month = document.querySelector('.card_mes');
let monthInput= document.querySelector('#mes');
let monthError = document.querySelector('.form__input-mm-error');

//año de la tarjeta//
let year= document.querySelector('.card_año');
let yearInput= document.querySelector('#año');
let yearError= document.querySelector('.form__input-aa-error');

//cvc de la tarjeta//
let cvc= document.querySelector('.form__fecha_cvc');
let cvcInput= document.querySelector('#numerocvc');
let cvcError= document.querySelector('.form__input-cvc-error');

//ingreso del nombre//
nameInput.addEventListener('input', ()=>{
    if(nameInput.value == ''){
        namecard.textContent ='XXXX XXXX'
    }else{
        namecard.textContent= nameInput.value;
    }
});

//ingreso del numero//
numberInput.addEventListener('input', ()=>{


//validando que haya una letra//
    let regExp = /[A-z]/g;
    if(regExp.test(numberInput.value)){
        MostrarError(numberInput, numberError, 'Error formato, solo numeros');
    }else{
        numberInput.value = numberInput.value.replace(/\s/g,'').replace(/([0-9]{4})/g, '$1 ').trim();
        MostrarError(numberInput, numberError, '', false);
        
    }

    numbercard.textContent = numberInput.value;

    if(numberInput.value == ''){
        numbercard.textContent = '0000 0000 0000 0000';
    }
});

//INGRESO DEL MES//

monthInput.addEventListener('input', ()=>{
    month.textContent = monthInput.value;
    validateletra(monthInput, monthError);
    
});

//INGRESO DEL AÑO

yearInput.addEventListener('input', ()=>{
    year.textContent = yearInput.value;
    validateletra(yearInput, yearError);
});

//INGRESO DEL CVC
cvcInput.addEventListener('input', ()=>{
    cvc.textContent = cvcInput.value;
    validateletra(cvcInput, cvcError);
});


//BOTON CONFIRMAR//

let confirmBtn= document.querySelector('.form__submit')

let ValidacionNombre= false;
let ValidacionNumero= false;
let ValidacionMes= false;
let ValidacionAño= false;
let ValidacionCVC= false;

//FORMULARIO Y GRACIAS//
let formulariosSeccion= document.querySelector('.form');


confirmBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    
    //validar nombre//
    if(verificar(nameInput, nameError)){
            ValidacionNombre = true;        
        }else{
            ValidacionNombre = false;
    }

    //validar numero//
    if(verificar(numberInput, numberError) ==true){
        if(numberInput.value.length == 19){
            MostrarError(numberInput, numberError, '', false);
            ValidacionNumero = true;
        }else{
            MostrarError(numberInput, numberError, 'Número incorrecto');
            ValidacionNumero = false;
        }
    }

    //validar mes//
    if(verificar(monthInput, monthError)){
        if(parseInt(monthInput.value)>0 && parseInt(monthInput.value)<=12){
            MostrarError(monthInput, monthError, '', false);
            ValidacionMes = true;
        }else{
            MostrarError(monthInput, monthError, 'Mes incorrecto');
            ValidacionMes = false;
        }

    }

    //validar año//
    if(verificar(yearInput, yearError)){
        if(parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27){
            MostrarError(yearInput, yearError, '', false);
            ValidacionAño = true;
        }else{
            MostrarError(yearInput, yearError, 'Año incorrecto');
            ValidacionAño = false;
        }
    }

    //validar cvc//
    if(verificar(cvcInput, cvcError)){
        if(cvcInput.value.length == 3){
            MostrarError(cvcInput, cvcError, '', false);
            ValidacionCVC = true;
        }else{
            MostrarError(cvcInput, cvcError, 'CVC incorrecto');
            ValidacionCVC = false;
        }
    }

    if(ValidacionNombre == true && ValidacionNumero == true && ValidacionMes == true && ValidacionAño == true && ValidacionCVC == true){
        formulariosSeccion.style.display= 'none';
        
    }
});

//FUNCIONES//
function MostrarError(divInput, divError, msgError, mostrar = true){
    if(mostrar){
        divError.textContent = msgError;
        divInput.style.borderColor= "#FF0000";
        }else{
            divError.textContent='';
            divInput.style.borderColor = 'hsl(270, 3%, 87%)';
        }
    }

function verificar(divInput, divError){
    if(divInput.value.length>0){
        MostrarError(divInput, divError, "", false);
        return true;
    }else{
        MostrarError(divInput, divError, "No puede estar vacío");
        return false;
    }

}


function validateletra(input, Error){
    let regExp = /[A-z]/g;
    if(regExp.test(input.value)){
        MostrarError(input, Error, 'Error formato, solo numeros');
    }else{
        MostrarError(input, Error, '', false);
    }
}