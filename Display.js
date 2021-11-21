// Intereacción con los botones para mostrar en el display.

class Display {
    constructor (displayValorArriba, displayValorAbajo) {
        this.displayValorArriba = displayValorArriba;
        this.displayValorAbajo = displayValorAbajo;
        this.calculadora = new Calculadora();
        this.operacion = undefined;
        this.valorArriba = "";
        this.valorAbajo = "";
        this.signos = {
            sumar: "+",
            restar: "-",
            dividir: "/",
            multiplicar: "*"
        }
    }

    //Agrega los valores en la calculadora.
    agregarNumero (numero) {
        if(numero === "." && this.valorAbajo.includes(".")) return // Si el número incluye un punto, no va a aceptar otro punto más.
        this.valorAbajo = this.valorAbajo.toString() + numero; // Concatena los números para que vayan uno después del otro.
        this.imprimirValores();
    }
    
    // Imprime los valores en el display.
    imprimirValores () {
        this.displayValorArriba.textContent = this.valorArriba;
        this.displayValorAbajo.textContent = `${this.valorAbajo} ${this.signos[this.operacion] || ""}`
    }

    // Borra el último número colocado en el display.
    borrar () {
        this.valorAbajo = this.valorAbajo.toString().slice(0, -1);
        this.imprimirValores();
    }

    // Borra todo el contenido en el display.
    reset () {
        this.valorAbajo = "";
        this.valorArriba = "";
        this.operacion = undefined;
        this.imprimirValores();
    }

    // Muestra cómo se verán las operaciones, el valor anterior se mostrará arriba mientras que el valor actual de la operación se mostrará abajo. 
    computar (tipo) {
        this.operacion !== "igual" && this.calcular();
        this.operacion = tipo;
        this.valorArriba = this.valorAbajo || this.valorArriba;
        this.valorAbajo = "";
        this.imprimirValores();
    }

    // Toma todos los valores del display y se lo pasa a la calculadora para que realice la operación.
    calcular () {
        const valorArriba = parseFloat(this.valorArriba),
            valorAbajo = parseFloat(this.valorAbajo);
        
        if (isNaN(valorAbajo) || isNaN(valorArriba)) return
        this.valorAbajo = this.calculadora[this.operacion](valorArriba,valorAbajo);
    }

}


