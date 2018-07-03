// 有关闭包的面试题
//1、
console.log('1：');
{
	console.log(a);
	var a = 12;
	function fn() {
		console.log(a);
		var a = 13;
	}
	fn();
	console.log(a);
}
// undefined,undefined,12

//2、
console.log('2：');
{
	console.log(a);
	var a = 12;
	function fn() {
		console.log(a);
		a = 13;
	}
	fn();
	console.log(a);
}
// undefined,12,13

//3、
console.log('3：');
{
	console.log(a);
	a = 12;
	function fn() {
		console.log(a);
		var a = 13;
	}
	fn();
	console.log(a);
}
// 报错：a is not defined

//4、
console.log('4：');
{
	var foo = 1;
	function bar() {
		if (!foo) {
			var foo = 10;
		}
		console.log(foo);
	}
	bar();
}
// 10

//5、
console.log('5：');
{
	var n = 0;
	function a() {
		var n = 10;
		function b() {
			n++;
			console.log(n);
		}
		b();
		return b;
	}
	var c = a();
	c();
	console.log(n);
}
// 11,12,0

//6、
console.log('6：');
{
	var a = 10,
		b = 11,
		c = 12;
	function test(a){
		a = 1;
		var b = 2;
		c = 3;
	}
	test(10);
	console.log(a);
	console.log(b);
	console.log(c);
}
// 10,11,3

//7、
console.log('7：');
{
	// if (!("a" in window)) {	//配置为node环境
	// 	var a = 1;
	// }
	// console.log(a); // undefined
}


//8、
console.log('8：');
{
	// "use strict"
	var a = 4;
	function b(x,y,a) {
		console.log(a);
		arguments[2] = 10;  //arguments实参与形参变量存在映射表关系，严格模式下，argument实参与形参变量不存在映射
		console.log(a);
	}
	a = b(1,2,3);	//undefined，b函数执行无返回值
	console.log(a);
}
// 3,10,undefined（严格模式下，3,3,undefined）

// 9、
console.log('9：');
{
	var foo = 'hello';
	(function (foo) {
		console.log(foo);
		var foo = foo || 'world';
		console.log(foo);
	})(foo);	//这里的foo是将全局变量foo的值当做实参传递给私有作用域中的形参
	console.log(foo);
}
// hello,hello,hello

// 10、
console.log('10：');
{
	var a = 9;
	function fn() {
		a = 0;
		return function (b) {
			return b+a++;
		}
	}
	var f = fn();
	console.log(f(5));
	console.log(fn()(5));
	console.log(f(5));
	console.log(a);
}
// 5,5,6,2

// 11、
console.log('11：');
{
	var arr = [1,2,3,4];
	function fn(arr) {
		arr[0] = 0;
		arr = [0];	//arr指向新的引用地址
		arr[0] = 100;
		return arr;
	}
	var res = fn(arr);
	console.log(arr,res);
}
// [0,2,3,4] [100]

// 12、
console.log('12：');
{
	function fn(i) {
		return function (n){
			console.log(n + (i++));
		}
	}
	var f = fn(10);
	f(20);
	fn(20)(40);
	fn(40)(50);
	f(30);
}
// 30,60,90,41

// 13、
console.log('13：');
{
	var num = 10;	// =>60 =>65 
	var obj = {num: 20};	//30
	obj.fn = (function (num){
		this.num = num * 3;	//this:window
		num++;
		return function(n){
			this.num += n;	//obj.fn(10)=>30
			num++;
			console.log(num);//22 23
		}
	})(obj.num);
	var fn = obj.fn;
	fn(5);
	obj.fn(10);
	console.log(num,obj.num);
}
// 22,23,10,30