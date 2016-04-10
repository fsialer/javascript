

function clic(){
	alert(":*");
}

var mi_boton=document.querySelector("#mi_btn");
mi_boton.addEventListener("click",clic,false);

/* la propiedad classList.add("xx") agrega un nombre de tipo clase en l etiqueta que se desea.
getElementsByTagName selecccionar etiquetas html
getElementsClassName seleccciona las etiqueta de tipo class
getElementsById selecciona las etiquetas con Id.

//creando una funcion al estilo jquery
function $(selector){
return document.querySelector(selector);}
var mi_id=$("#texto")



//eventos

onClick, se despliega el evento cuando das un click;
onmouseover, se despliega su el cursor pasa encima
onmouseout, se despliega cuanoo saco el curso de la etiqueta asignada en el evemto.


funcion filter

filtra el arreglo segun loque buscas
var numeros=[10,2,3,5,9,20,22];
var numeros_pares=numeros.filter(function(numero){
return numero%2==0;})
numeros_pares
[10, 2, 20, 22]


function map, lps datos modificados los guarda en un numero arreglo

var cuadrados=numeros.map(function(elemento){
return elemento*elemento});
undefined
cuadrados
[100, 4, 9, 25, 81, 400, 484]

function reduce
mantiene un registro de todo arreglo recorrido, se puede dar un valor inicial en el segundo parametro de reduce(callback,segund_para)
var palabra=letras.reduce(function(valor_anterior_retornado,valor_actual,index,arreglo){return valor_anterior_retornado+valor_actual;})
*/