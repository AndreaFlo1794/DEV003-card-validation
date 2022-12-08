
const validator = {
  isValid: function (inputCard) {
    const reverseInput = inputCard.toString().split('').reverse().map(Number);
    console.log(reverseInput); 
    
    // Operación a las posiciones pares 
    let newArray = reverseInput.map((num, i) => {
      if (i % 2 === 1) {
        const double = (num * 2);
        const m = double.toString().split('').reduce(function (a, b) { 
          if (double >= 10) { 
            return a + parseInt(b);
          } else {
            return double;
          }
        }, 0);
        return m;
      } else {
        return num;
      }
    }); 
    //console.log(newArray);

    // Sumar todos los números del array
    newArray = newArray.reduce((previus, next) => {
      const sum = previus + next;
      return sum;
      }, 0);
    //console.log(newArray); 

    if (newArray % 10 === 0) {
      return true;
    } else {
      return false;
    }
  },

  maskify: function (inputCard) {
    let value =  inputCard.toString();
    // Números que estarán ocultos
    let replaceNums = value.slice(0, -4);
    // Números que serán visibles
    let noReplaceNums = value.slice(-4);
    // Nuevo array que oculta los números
    let newArray = replaceNums.split('').map(function() {
      return '#';
    });
    newArray = newArray.join('');
    return newArray.concat(noReplaceNums);

  },
  
}
  export default validator;