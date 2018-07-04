// 1、
{
	var fullName = 'language';
	var obj = {
		fullName: 'javascript',
		prop: {
			getFullName:function(){
				return this.fullName;
			}
		}
	};
	console.log(obj.prop.getFullName());	//this=>obj.prop
	var test = obj.prop.getFullName;
	console.log(test());	//this=>window
}
// undefined,language

// 2、
{
	var name = "window";
	var Tom = {
		name: "Tom",
		show:function(){
			console.log(this.name);
		},
		wait: function(){
			var fun = this.show;	//this=>Tom
			fun();	//function(){console.log(this.name);}	this=>window
		}
	}
	Tom.wait();
}

// 3、
{
	var length = 10;
	function fn() {
	    console.log(this.length);
	}

	var obj = {
	  length: 5,
	  method: function(fn) {
	    fn();	//this=>window
	    arguments[0]();	//this=>arguments
	  }
	};

	obj.method(fn, 1);
}
// 10,2

// 4、
{
	var a={},
	    b={key:'b'},
	    c={key:'c'};

	a[b]=123;	// a = {[object Object]: 123}
	a[c]=456;	// a = {[object Object]: 456}

	console.log(a[b]);
	a[b] == a[c];
}
// 456,true

// 5、
{
	(function () {
	    try {
	        throw new Error();
	    } catch (x) {
	        var x = 1, y = 2;	// x为当前作用域私有变量，y为上级作用域变量
	        console.log(x);
	    }
	    console.log(x);
	    console.log(y);
	})();
}
// 1,undefined,2

// 6、
{
	console.log(typeof undefined == typeof NULL);	// true
	console.log(typeof undefined == typeof null);	// false
	console.log(typeof 1);	// 'number'
	console.log(typeof typeof 1);	// 'string'

}
// 7、
{
	var b = 1;
	function outer(){
	       var b = 2
	    function inner(){
	    	// 变量提升var b;b为undefined
	    	console.log(b);
	        b++;	// NaN
	        console.log(b);
	        var b = 3;
	        console.log(b);
	    }
	    inner();
	}
	outer();

}