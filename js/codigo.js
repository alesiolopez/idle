let dinero = 6; //variable central contador

//pasar a dolar un numero: Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(VARIABLE);
// Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(dineroProduce[0]);



let inventario = [0,0,0,0,0,0,0]; //array de cada actualización en 0
let dineroProduce = [0.5,0.02,0.04,0.08,0.1,0.5,1]; //array con producción de cada actualización
let precioProducto = [5,6,10,20,50,75,200]; //array con el valor de cada actualización
let levelProducto = [0,0,0,0,0,0,0];
let porsegundo = 0; //variable para sumar la producción total por segundo

//función para que sume 1 con cada clic
function clic(){
    dinero=dinero+dineroProduce[0];
}

//Deshabilitando botones
//document.querySelector('#button').disabled = true;

//función para comprar las actualizaciones.
function comprar(objeto){
    if(dinero >= precioProducto[objeto] && objeto!=0){
        inventario[objeto]++;
        dinero -= precioProducto[objeto];
        //aumentar precio del producto
        levelProducto[objeto]++;
        precioProducto[objeto]=((precioProducto[objeto]*levelProducto[objeto])/10)+precioProducto[objeto];
        //aumentar la producción de dinero por segundo por cada actualización que haga. En este caso vamos a aumentar 0.001 por cada actualización así cada 10 niveles aumenta 0.01
        dineroProduce[objeto] = dineroProduce[objeto]+0.001;
    } else if (objeto == 0 && dinero>=precioProducto[0]) {
        inventario[objeto]++;
        dinero -= precioProducto[0];
        dineroProduce[0]=dineroProduce[0]+0.1;
        levelProducto[0]++;
        precioProducto[0]=((precioProducto[0]*levelProducto[0])/10)+precioProducto[0];
    } else{
        document.getElementById("aviso-1").innerHTML="No tienes suficiente dinero.";
    }
}

//función para PRODUCIR con un bucle for
function producir(){
    for(let contador=1; contador<inventario.length; contador++){
        dinero += inventario[contador] * dineroProduce[contador];
    }
}

//función para poder tener la página ACTUALIZADA constantemente.
function render(){
    //visualizar la cantidad de diner por segundo:
    porsegundo = (inventario[1]*dineroProduce[1]) + (inventario[2]*dineroProduce[2]) + (inventario[3]*dineroProduce[3]) + (inventario[4]*dineroProduce[4]) + (inventario[5]*dineroProduce[5]) + (inventario[6]*dineroProduce[6]);
    document.getElementById("contador").innerHTML = "Dinero: " + Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(dinero);
    document.getElementById("porsegundo").innerHTML = "Dinero/s: " + Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(porsegundo);
    document.getElementById("porclics").innerHTML = "Valor Billete: " + Intl.NumberFormat('USD', { style: 'currency', currency: 'USD' }).format(dineroProduce[0]);
    //Estadisticas:
    document.getElementById("inventario").innerHTML = `Nivel Billete: ${inventario[0]}<br>
    Kioscos: ${inventario[1]}<br>
    Verdulerías: ${inventario[2]}<br>
    Almacenes: ${inventario[3]}<br>
    Carnicerías: ${inventario[4]}<br>
    Pets Shop: ${inventario[5]}<br>
    Supermercados: ${inventario[6]}
    `;
}

//funcion para los precios
function precios(){
    document.getElementById("costo-1").innerText ="US$ " + precioProducto[0].toFixed(2);
    document.getElementById("costo-2").innerText ="US$ " + precioProducto[1].toFixed(2);
    document.getElementById("costo-3").innerText ="US$ " + precioProducto[2].toFixed(2);
    document.getElementById("costo-4").innerText ="US$ " + precioProducto[3].toFixed(2);
    document.getElementById("costo-5").innerText ="US$ " + precioProducto[4].toFixed(2);
    document.getElementById("costo-6").innerText ="US$ " + precioProducto[5].toFixed(2);
    document.getElementById("costo-7").innerText ="US$ " + precioProducto[6].toFixed(2);
}

//Función de guardar datos
function guardarDatos(){
    localStorage.setItem("dinero", dinero);
    localStorage.setItem("inventario", JSON.stringify(inventario));
}

//Función de obtener los datos guardados
function obtenerDatos(){
    if(localStorage.getItem("dinero") && localStorage.getItem("inventario")){
        dinero = JSON.parse(localStorage.getItem("dinero"));
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