/*function setA(){
	//console.log(a);//underfined
	if(false){
		//var a="aaa";//变量提升
	}
	var b=2;
	{
		var b=1;//提升 下面输出1 let不提升输出2
	}
	//console.log(b)

}
setA();

{
	let obj={
		name:'zs',
		age:20,
		getYear:()=>{
			console.log(this)
		}
	}
	//obj.getYear();
}
{
	var obj = {
    birth: 1990,
    getAge: function () {
        var fn = function () {
        	//console.log(this);//window
            return new Date().getFullYear() - this.birth; // this指向window或undefined
        };
        var fn2 = () =>{
        	//console.log(this)
        	return new Date().getFullYear() - this.birth;
        }  // this指向obj对象
		//console.log(this);//obj
        return fn2();
    }};
    obj.getAge();
}
{
	let arr=[1,2,3,4,5];
	let {0:first,[arr.length-1]:last}=arr;
	//console.log([13,4].map((a) => a));
}
{
	let map=new Map([['name','zzz'],[{},12]]);
	for (let item of map.entries()) {
	  //console.log(item[0], item[1]);
	}
}
{
	var y = 1;

	function foo(x = y) {
	  // ...
	  //console.log(y+x6y )
	}

	foo() 
}
{
	var f = function () {};

	// ES5
	console.log(f.name) // ""
}

{

	var x=2;
	const arr = [
	  ...(x > 0 ? ['a'] : []),
	  'b'
	];
	console.log(arr);
	brr=[...arr];
	console.log()

}*/
(function(){
	console.log("des");
	
})();
