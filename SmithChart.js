 //构造函数，ctx为canvas context
function SmithChart(ctx){
  this.ctx = ctx;
}


//normalize function
function nz(x){
	return x*300;
}





// 画阻抗虚部的圆
SmithChart.prototype.drawZIm=function(ZIm, color){
	var theta;
	theta=Math.atan(ZIm)
	this.ctx.beginPath();
	if(ZIm===0){
		this.ctx.moveTo(nz(0),nz(1));
		this.ctx.lineTo(nz(2),nz(1));
	}
  	else if(ZIm>0){
		this.ctx.arc(nz(2),nz(1-1/ZIm),nz(1/ZIm),Math.PI*0.5,Math.PI*0.5+2*theta,false);
	}
	else{
		this.ctx.arc(nz(2),nz(1-1/ZIm),Math.abs(nz(1/ZIm)),Math.PI*1.5,Math.PI*1.5+2*theta,true)
	}
	
	this.ctx.stroke();
}

// 画阻抗实部的圆

SmithChart.prototype.drawZRe=function(ZRe, color){
	this.ctx.beginPath();
	this.ctx.arc(nz(ZRe/(ZRe+1)+1),nz(1),nz(1/(ZRe+1)),0,2*Math.PI,false);
	this.ctx.stroke();
}


// 画坐标系（横纵轴）
SmithChart.prototype.drawCoord=function(color){
	this.ctx.beginPath();
	this.ctx.moveTo(nz(0),nz(1));
	this.ctx.lineTo(nz(2),nz(1));
	this.ctx.moveTo(nz(1),nz(0));
	this.ctx.lineTo(nz(1),nz(2));
	this.ctx.stroke();
}
	
// 清空背景，然后重新绘制整个圆图（包括两种圆，横纵轴）
SmithChart.prototype.drawChart=function(){
	
	this.ctx.clearRect (0,0,nz(2),nz(2));
	this.ctx.beginPath();
	this.ctx.arc(300,300,300,Math.PI,-Math.PI,false);
	this.ctx.moveTo(nz(0),nz(1));
	this.ctx.lineTo(nz(2),nz(1));
	this.ctx.moveTo(nz(1),nz(0));
	this.ctx.lineTo(nz(1),nz(2));



	
	
	
	
	
	this.ctx.stroke();
}



// 画同心扇形（算输入阻抗和阻抗匹配时可能需要用）
SmithChart.prototype.drawArc=function(start, angle, color){
	
} 





/*
var canvas=document.getElementById('cv');
canvas=SmithChart(canvas);
var ctx=canvas.getContext('2d');
ctx.fillStyle='#FF0000';
ctx.fillRect(0,0,600,600);

*/


var canvas = document.getElementById("cv");
var ctx = canvas.getContext("2d");
var SC=new SmithChart(ctx);
	SC.ctx.beginPath();
	SC.ctx.arc(300,300,300,Math.PI,-Math.PI,false);
	SC.ctx.stroke();

//	SC.ctx.fillStyle='#FF0000';
	//SC.ctx.fillRect(0,0,600,600);
		
	SC.ctx.strokeRect(0,0,600,600);
	
	SC.drawChart();

	
	alert("同学您好！130222班 杨力同学诚招女友，联系电话***，非诚勿扰~");
	
	
	
	



