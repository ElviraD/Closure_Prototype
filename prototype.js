//有关原型与原型链的面试题目
{
	function Fn(){
		this.x = 100;
		this.y = 200;
		this.getX = function () {
			console.log(this.x);
		}
	}
	Fn.prototype.getX = function () {
		console.log(this.x);
	};
	Fn.prototype.getY = function () {
		console.log(this.y);
	};
	var f1 = new Fn;
	var f2 = new Fn;
	console.log(f1.getX === f2.getX);	//false
	console.log(f1.getY === f2.getY);	//true
	console.log(f1.__proto__.getY === Fn.prototype.getY);	//true
	console.log(f1.__proto__.getX === f2.getX);		//false
	console.log(f1.__proto__.getX === Fn.prototype.getX);	//true
	console.log(f1.constructor);	//Fn
	console.log(Fn.prototype.__proto__.constructor);	//Object
	f1.getX();	//100	this=>f1
	f1.__proto__.getX();	//undefined 	this=>f1.__proto__(Fn.prototype)
	f2.getY();	//200	this=>f2
	Fn.prototype.getY();	//undefined	this=>f2.__proto__(Fn.prototype)
}
// false,true,true,false,true,Fn,Object,100,undefined,200,undefined