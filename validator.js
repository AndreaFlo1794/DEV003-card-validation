const validator = {
  // ...

  isValid:function (creditCardNumber) {
    
    const tarjeta =creditCardNumber; 
    const reversoTarjetaArray = tarjeta.split("");
    const reversoTarjeta=reversoTarjetaArray.reverse();  
    for(let i =0 ;i<reversoTarjeta.length;i++){
      if(i%2!==0){
        const num1 =parseInt(reversoTarjeta[i])*2
        if(num1>=10){     
          const num2=Math.trunc(num1/10) + num1%10;
          reversoTarjeta[i]=num2+"";
        }else{
          reversoTarjeta[i]=num1 +"";
        }
      }
    }
    let suma=0;
    for(let i=0;i<reversoTarjeta.length;i++){
      suma+=parseInt(reversoTarjeta[i]);
    }
    if(suma%10===0){
      return true;
    }else{
      return false;
    }
  },
  
  maskify: function(creditCardNumber){
    const sinespacio=creditCardNumber.replace(/\s/g,"");
    let mask=sinespacio
    if(sinespacio.length>4){
      const cadena1=sinespacio.slice(0,-4).replace(/[\da-zA-Z]/g,"#")
      const cadena2=sinespacio.slice(-4)
      mask=cadena1+cadena2
      return mask
    }
    return mask
    
  }
  

}


;

export default validator;