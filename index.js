import validator from './validator.js';
//VALIDATOR.MASKIFY()
//nombre de la tarjeta variables
const namecard = document.querySelector('.card__DatosNombre');
const nameInput = document.querySelector('#nombreDeTarjeta');
const nameError =document.querySelector('.form__inputnombredelatarjeta--error');  
//numero de la tarjeta variables
const numbercard = document.querySelector('.card__numeroDeTarjeta');
const numberInput = document.querySelector('#numerodetarjeta');
const numberError = document.querySelector('.form__inputNumerodelatajeta--error');  
//mes de la tarjeta variable//
const month = document.querySelector('.card_mes');
const monthInput= document.querySelector('#mes');
const monthError = document.querySelector('.form__input-mm-error');
//año de la tarjeta//
const year= document.querySelector('.card_año');
const yearInput= document.querySelector('#año');
const yearError= document.querySelector('.form__input-aa-error'); 
//cvc de la tarjeta//
const cvcInput= document.querySelector('#numerocvc');
const cvcError= document.querySelector('.form__input-cvc-error');
//ingreso del nombre//
nameInput.addEventListener('input', ()=>{
  if(nameInput.value === ''){
    namecard.textContent ='XXXX XXXX'
  }else{
    namecard.textContent= nameInput.value;
  }
});
  
//ingreso del numero//
numberInput.addEventListener('input', ()=>{
//validando que haya una letra//
  const regExp = /[A-z]/g;
  if(regExp.test(numberInput.value)){
    MostrarError(numberInput, numberError, 'Error formato, solo numeros');
  }else{
    MostrarError(numberInput, numberError, '', false);   
  }
  numbercard.textContent = numberInput.value;
  
  if(numberInput.value === ''){
    numbercard.textContent = '0000000000000000';
  }
  // validator.maskify(numberInput.value)
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
  //cvc.textContent = cvcInput.value;
  validateletra(cvcInput, cvcError);
});
//BOTON CONFIRMAR//
const confirmBtn= document.querySelector('.form__submit')
let ValidacionNombre= false;
let ValidacionNumero= false;
let ValidacionMes= false;
let ValidacionAño= false;
let ValidacionCVC= false;
//FORMULARIO//
const formulariosSeccion= document.querySelector('.form');
confirmBtn.addEventListener('click', (e)=>{
  e.preventDefault();
      
  //validar nombre//
  if(verificar(nameInput, nameError)){
    ValidacionNombre = true;        
  }else{
    ValidacionNombre = false;
  }
  
  //validar numero//
  if(verificar(numberInput, numberError) ===true){
    if(numberInput.value.length === 16){
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
    if(cvcInput.value.length === 3){
    //MostrarError(cvcInput, cvcError, '', false);
      ValidacionCVC = true;
    }else{
    //  MostrarError(cvcInput, cvcError, 'CVC incorrecto');
      ValidacionCVC = false;
    }
  }
  
  if(ValidacionNombre === true && ValidacionNumero === true && ValidacionMes === true && ValidacionAño === true && ValidacionCVC === true){
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
  const regExp = /[A-z]/g;
  if(regExp.test(input.value)){
    MostrarError(input, Error, 'Error formato, solo numeros');
  }else{
    MostrarError(input, Error, '', false);
  }
}

const formulario =document.getElementById("button_form");
formulario.addEventListener('click',(e)=>{
  e.preventDefault()
  //capturamos el valor de los inputs del formulario con el name
   
  const creditCardNumber= numberInput.value;
  //Funciones de validación
  const resultado=validator.isValid(creditCardNumber) //obtengo si la tarjeta es válid
  const tarjeta=validator.maskify(creditCardNumber) // enmascaro la tarjeta

  //Evaluar si la tarjeta es válida o no
  if(resultado){
    alert('Tarjeta válida '+ tarjeta);
  }else{
    alert('Tarjeta no valida '+ tarjeta + 'por favor ingresar nuevamente la tarjeta');
  }
    
  document.getElementById('numerodetarjeta').innerHTML=""+tarjeta;

})


