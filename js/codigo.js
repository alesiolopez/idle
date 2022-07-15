let dinero = 0; //variable central contador

//pasar a dolar un numero: Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(VARIABLE);
// Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(dineroProduce[0]);



let inventario = [0,0,0,0,0,0]; //array de cada actualización en 0
let dineroProduce = [1,2,4,10,50,100]; //array con producción de cada actualización
let precioProducto = [100,200,400,1000,5000,10000]; //array con el valor de cada actualización

let porsegundo = 0; //variable para sumar la producción total por segundo

//función para que sume 1 con cada clic
function clic(){
    dinero++;
}

//Deshabilitando botones
//document.querySelector('#button').disabled = true;

//función para comprar las actualizaciones.
function comprar(objeto){
    if(dinero >= precioProducto[objeto]){
        inventario[objeto]++;
        dinero -= precioProducto[objeto];
    } else {
        document.getElementById("aviso-1").innerHTML="No tienes suficiente dinero.";
    }
}

//función para producir con un bucle for
function producir(){
    for(let contador=0; contador<inventario.length; contador++){
        dinero += inventario[contador] * dineroProduce[contador];
    }
}

//función para poder tener la página actualizada constantemente.
function render(){
    porsegundo = (inventario[0]*1) + (inventario[1]*2) + (inventario[2]*4) + (inventario[3]*10) + (inventario[4]*50) + (inventario[5]*100);
    document.getElementById("contador").innerHTML = "Dinero: " + Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(dinero);
    document.getElementById("porsegundo").innerHTML = "Dinero/s: " + Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(porsegundo);
    document.getElementById("inventario").innerHTML = `Kioscos: ${inventario[0]}<br>
    Verdulerías: ${inventario[1]}<br>
    Almacenes: ${inventario[2]}<br>
    Carnicerías: ${inventario[3]}<br>
    Pets Shop: ${inventario[4]}<br>
    Supermercados: ${inventario[5]}
    `;
}

//funcion para los precios
function precios(){
    document.getElementById("costo-1").innerText ="US$ " + precioProducto[0];
    document.getElementById("costo-2").innerText ="US$ " + precioProducto[1];
    document.getElementById("costo-3").innerText ="US$ " + precioProducto[2];
    document.getElementById("costo-4").innerText ="US$ " + precioProducto[3];
    document.getElementById("costo-5").innerText ="US$ " + precioProducto[4];
    document.getElementById("costo-6").innerText ="US$ " + precioProducto[5];
}

//Función de guardar datos
function guardarDatos(){
    localStorage.setItem("dinero", dinero);
    localStorage.setItem("inventario", JSON.stringify(inventario));
}

//Función de obtener los datos guardados
function obtenerDatos(){
    if(localStorage.getItem("dinero") && localStorage.getItem("inventario")){
        dinero = localStorage.getItem("dinero");
        inventario = JSON.parse(localStorage.getItem("inventario"));
        clic();
    } else{
        alert("No se encontraron datos.")
    }
}

//NOTIFICACIONES------------------------
function notificaciones(){
    document.getElementById("aviso-1").innerHTML = "";
}

//---------ACTUALIZACIÓN de la producción-------------
let FPSProduce =1;

setInterval(function(){
    producir();
    precios();
},1000/FPSProduce);

//---------ACTUALIZACIÓN del render, o sea, de todos los datos de la página.
let FPS =30;

setInterval(function(){
    render();
},1000/FPS);

let FPSaviso = 0.4;

setInterval(function(){
    notificaciones();
},1000/FPSaviso);