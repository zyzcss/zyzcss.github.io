function ballRun({
	opacity=0.6,
	color=['red','black','pink','green','blue','purple','gray'],
	ballR=[10,25],
	balldx=10,
	balldy=10,
	balldr=[2,5]}={}){
	//创建小球类
	class Ball{
		//构造函数
		constructor (clientX,clientY,color,r,dx,dy,dr){
			this.clientX=clientX;
			this.clientY=clientY;
			this.color=color;
			this.r=r;
			this.dx=parseInt(mathR(-dx,dx));
			this.dy=parseInt(mathR(-dy,dy));
			this.dr=mathR(dr[0],dr[1]);
		}	
		drawBall(){
			ctx.save();
			ctx.beginPath();
			ctx.arc(this.clientX,this.clientY,this.r,0,Math.PI*2);
			ctx.fillStyle=this.color;
			ctx.fill();
			ctx.restore();
		}
		run(){
			this.r-=this.dr;
			if(this.r<=0){
				this.r=0;
			}
			this.clientX+=this.dx;
			this.clientY+=this.dy;
		}
	}	
	//设置画布大小
	function set_canvas_size() {
		canvas_width = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 
		canvas_height = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	}
	//创建画布
	let canvas=document.createElement("canvas"); 
	//得到二维对象
	let ctx=canvas.getContext('2d'),canvas_width,canvas_height;
	//把画布放入body 设置css
	document.getElementsByTagName("body")[0].append(canvas);
	canvas.style.cssText = "position:fixed;top:0;left:0;z-index:-1;opacity:"+opacity+";";
	set_canvas_size();
	let balls=[];
	//鼠标移动时画小球，放入数组
	window.onmousemove=function(e){

		let b1=new Ball(e.clientX,e.clientY,color[mathR(0,color.length-1)],mathR(ballR[0],ballR[1])
						,balldx,balldy,balldr);
		b1.drawBall();
		balls.push(b1);

	}
	//窗体改变大小时画布自适应
	window.onresize=function(){
		set_canvas_size();
	}
	function mathR(i,j){
		return (Math.random()*(j-i)+i).toFixed(0);
	}
	//小球r>0时让小球运动，r=0时把小球从数组中删除
	setInterval(function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		let len=balls.length;
		for (let i = 0; i<len; i++) {
			if(balls[i]!='undefined'){
				if(balls[i].r!='undefined'){
					balls[i].drawBall();
					balls[i].run();
					if(balls[i].r==0){
						//console.log("no");
						balls.splice(i,1);	
						i--;
						len--;
					}
				}
			}
		}
	},60);
};