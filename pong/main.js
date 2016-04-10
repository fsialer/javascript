//self lo agrega los objetos en el objecto windows
(function(){
	self.Board=function(width,height){
		this.width=width;
		this.height=height;
		this.playing=false;
		this.game_over=false;
		this.bars=[];
		this.ball=null;
	}

	self.Board.prototype={
		get elements(){
			var elements=this.bars.map(function(bar){return bar;});
			elements.push(this.ball);
			return elements;
		}
	}
	
})();

(function(){
	self.Ball=function(x,y,radius,board){
		this.x=x;
		this.y=y;
		this.radius=radius;

		this.speed_y=0;
		this.speed_x=3;
		this.board=board;
		this.direction=1;
		this.bounce_angle=0;
		this.max_bounce_angle=Math.PI/12;
		this.speed=3;
		board.ball=this;
		this.kind="circle";
		
	}
	self.Ball.prototype={
			move:function(){
				this.x+=(this.speed_x*this.direction);
				this.y+=(this.speed_y);
			},
			get width(){
				return this.radius*2;
			},
			get height(){
				return this.radius*2;
			},
			collision:function(bar){
				//reacciona ala colision con una barra que recibe cmo parametro
				var relative_intersect_y=(bar.y+(bar.height/2))-this.y;
				var normalized_intersect_y=relative_intersect_y/(bar.height/2);
				this.bounce_angle=normalized_intersect_y*this.max_bounce_angle;
				this.speed_y=this.speed*-Math.sin(this.bounce_angle);
				this.speed_x=this.speed*Math.cos(this.bounce_angle);
				if (this.x>(this.board.width/2)) {
					this.direction=-1;
				}else{
					this.direction=1;
				}
			}
		};
})();

(function(){
	self.Bar=function(x,y,width,height,board){
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
		this.board=board;
		this.board.bars.push(this);
		this.kind="rectangle";
		this.speed=10;
	}

	self.Bar.prototype={
		down:function(){
			this.y+=this.speed;
		},
		up:function(){
			this.y-=this.speed;
		},
		toString:function(){
			return "x: "+this.x + " y: "+this.y;
		}
	}
})();

(function(){
	self.BoardView=function(canvas,board){
		this.canvas=canvas;
		this.canvas.width=board.width;
		this.canvas.height=board.height;
		this.board=board;
		this.context=canvas.getContext("2d");
	}

	self.BoardView.prototype={
		clean:function(){
			this.context.clearRect(0,0,this.board.width,this.board.height);

		},
		draw:function(){
			for (var i = this.board.elements.length - 1; i >= 0; i--) {
				var el=this.board.elements[i];
				draw(this.context,el);
			}
		},
		check_collisions:function(){
			for (var i = this.board.bars.length - 1; i >= 0; i--) {
				var bar=this.board.bars[i];
				if (hit(bar,this.board.ball)) {
					this.board.ball.collision(bar);
				}
			}
		},
		play:function(){
			if (this.board.playing) {
					this.clean();
					this.draw();
					this.check_collisions();
					this.board.ball.move();
			}
		
		}
	}

	function hit(a,b){
		//revisa si a colisiona con b
		var hit=false;
		//colosion horizontal
		if (b.x+b.width>=a.x && b.x<a.x+a.width) {
			//colision vertical
			if (b.y+b.height>=a.y && b.y<a.y+a.height) {
				hit=true;
			}
		}
		//colsision de a con b
		if (b.x<=a.x && b.x+b.width>=a.x+a.width) {
			if (b.y<=a.y && b.y+b.height>=a.y+a.height) 
				hit=true;
		}
		//colision b con a
		if (a.x<=b.x && a.x+a.width>=b.x+b.width) {
			if (a.y<=b.y && a.y+a.height>=b.y+b.height) 
				hit=true;
		}
		return hit;
	}
	function draw(context,element){
		

			switch(element.kind){
			case "rectangle":
			context.fillRect(element.x,element.y,element.width,element.height);
			break;
			case "circle":
			context.beginPath();
			context.arc(element.x,element.y,element.radius,0,7);
			context.fill();
			context.closePath();
			break;
		}

		}

		

	
})();
var board=new Board(800,400);
var bar=new Bar(20,100,40,100,board);
var bar_2=new Bar(735,100,40,100,board);
var canvas=document.getElementById('canvas');
var board_view=new BoardView(canvas,board);
var ball=new Ball(350,100,10,board);

document.addEventListener("keydown",function(ev){
	
	if (ev.keyCode==38) {
		ev.preventDefault();
		bar.up();
	}else if(ev.keyCode==40){
		ev.preventDefault();
		bar.down();
	}
	if (ev.keyCode==87) {
		ev.preventDefault();
		bar_2.up();
	}else if(ev.keyCode==83){
		ev.preventDefault();
		bar_2.down();
	}else if(ev.keyCode===32){
		ev.preventDefault();
		board.playing=!board.playing;

	}
	console.log(bar_2.toString());
})
board_view.draw()
window.requestAnimationFrame(controller);
function controller(){
board_view.play();

window.requestAnimationFrame(controller);
}



/*
template String

var template=`Hooa mundo`;

interpolacion
var nombre="fernando";
function nombre(){reutnr "Fernando"}
var saludo=`Hola ${nombre}`;
var saludo=`Hola ${nombre()}`;
console.log(saludo);

tagged template o plantilla etiquetadas

function tagged(cadenas,valores){
	console.log(cadenas);
	console.log(valores);
}

tagged`Hola ${"Fernando"} buen dia`;

arrow function

var numeros =[1,2,3,4,5];
var elevado=numeros.map((n)=>n*n);
console.log(elevaodo);

function Tutor(){
	this.nombre="fernando";

	setTimeout(()=>{
		console.log(this);
	this.nombre="Leandro";
	},500);
}
var tutor=new Tutor();
console.log(tutor.nombre);

setTimeout(function(){console.log(tutor.nombre);},1000);

Clases
'use strict';
	class Human{
	
	}

 class Tutor extends Human{
	constructor(nombre,last_name){
		this.nombre=nombre;
		this.last_name=last_name;
	}
	fullname(){
	return this.nombre+ " " +this.last_name; 
	}
 }

var tutor=new Tutor("Fernando","sialer");
console.log(tutor.fullname());



let es similar en var, el let es una variable se declara para el alcance de un bloque
y var para el alcance de una funcion  de manera global

'use strict';

init();
function init(){
	let nombre="Fernando";
	console.log(nombre);
}




*/