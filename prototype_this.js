// 原型、原型链
{
	function fun(){
		this.a = 0;
		this.b = function(){
			console.log(this.a);
		}
	}
	fun.prototype = {
		b: function(){
			this.a = 20;
			console.log(this.a);
		},
		c: function(){
			this.a = 30;
			console.log(this.a);
		}
	}
	var my_fun = new fun();
	my_fun.b();	//私有方法	this=>my_fun
	console.log(my_fun.a);
	my_fun.c();	//公有方法	this=>my_fun this.a = 30（将私有属性a修改为30）
	console.log(my_fun.a);
	var my_fun2 = new fun();
	console.log(my_fun2.a);
	my_fun2.__proto__.c();	//this=>my_fun2.__proto__ 当前实例通过原型链在类的共有属性上增加了一个a:30
	console.log(my_fun2.a);
	console.log(my_fun2.__proto__.a);
}
// 0,0,30,30,0,30,0,30

// document.parentNode与document.parentnode
{
	console.log(document.parentNode);	// null
	console.log(document.parentnode);	// undefined
}
// undefined
// 1、变量提升，只声明未定义默认值就是undefined
// 2、严格模式下，没有明确的执行主体，this就是undefined
// 3、对象没有这个属性名，属性值是undefined
// 4、函数形参不传值，默认就是undefined
// 5、函数没有返回值（没有return或者return;），默认返回就是undefined
// null
// 1、手动设置变量的值或者对象某一个属性值为null（此时不赋值，后边会赋值）
// 2、在JS的DOM元素获取中，如果没有获取到指定的元素对象，结果一般都是null
// 3、Object.prototype.__proto__的值也是null
// 4、正则捕获的时候如果没有捕获到结果，默认也是null

// 数组去重
{
	Array.prototype.myDistinct = function myDistinct(){
		var obj = {};
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (typeof obj[item] !== 'undefined') {
				this[i] = this[this.length-1];
				this.length--;
				i--;
				continue;
			}
			obj[item] = item;
		}
		obj = null;
		return this;
	}
}

// 如何避免函数重名问题
// 1、闭包
// 2、单例模式

// JavaScript中如何实现面向对象的继承
// 1、类式继承（原型链继承、借助构造函数实现继承、组合继承、寄生组合继承、ES6中的class）
// 2、原型继承
// 3、拷贝继承

// 闭包
// 1、保护私有作用域，保护私有变量不受外界环境的干扰
// 2、保存，形成一个不销毁的栈内存
// 3、耗内存