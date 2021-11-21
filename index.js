
// DOM - Tomando las id y class para empezar a usarlas con JS. 

const $displayValorArriba = document.getElementById("valor-arriba"),
    $displayValorAbajo = document.getElementById("valor-abajo"),
    $botonesNumeros = document.querySelectorAll(".numero"),
    $botonesOperadores = document.querySelectorAll(".operador");
    
const display = new Display($displayValorArriba, $displayValorAbajo);      

// Cada vez que se haga un click en un botón, el display agregará el valor escogido. 

$botonesNumeros.forEach(boton => {
    boton.addEventListener("click", () => display.agregarNumero(boton.innerHTML));
   
});


// Recibe el valor de la operación a realizar.

$botonesOperadores.forEach(boton => {
    boton.addEventListener("click", () => display.computar(boton.value));
   
});







// Nota: Al colocar una cantidad excesiva de números se salen del display. Esto se podría solucionar con una expresión regular para limitar la cantidad de números. (Investigando para hacerlo).