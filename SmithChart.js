'use strict';

//构造函数，ctx为canvas context

var matchList = [];

 function SmithChart(ctx){
    this.ctx = ctx;
}

//normalize function
function nz(x){
	return x*300;
}

function impedence2gamma(impedence){
	return new Complex(-1,0).add(impedence).mul(new Complex(1,0).add(impedence).inv());
}

function gamma2impedence(gamma){
	return new Complex(1,0).add(gamma).mul(new Complex(1,0).add(gamma.neg()).inv());
}

// 画阻抗虚部的圆
SmithChart.prototype.drawZIm=function(ZIm, color){
	var theta;
	theta=Math.atan(ZIm);
	this.ctx.beginPath();


	var color = arguments[1] ? arguments[1] : "#000080";
	this.ctx.strokeStyle = color;
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
};

// 画阻抗实部的圆

SmithChart.prototype.drawZRe=function(ZRe, color){
	this.ctx.beginPath();
	var color = arguments[1] ? arguments[1] : "#708090";
	this.ctx.strokeStyle = color
	this.ctx.arc(nz(ZRe/(ZRe+1)+1),nz(1),nz(1/(ZRe+1)),0,2*Math.PI,false);
	this.ctx.stroke();
};


// 画坐标系（横纵轴）
SmithChart.prototype.drawCoord=function(color){
	this.ctx.beginPath();
	var color = arguments[1] ? arguments[1] : "#8B5742";
	this.ctx.strokeStyle = color;
	this.ctx.moveTo(nz(0),nz(1));
	this.ctx.lineTo(nz(2),nz(1));
	this.ctx.moveTo(nz(1),nz(0));
	this.ctx.lineTo(nz(1),nz(2));
	this.ctx.stroke();
};

// 清空背景，然后重新绘制整个圆图（包括两种圆，横纵轴）
SmithChart.prototype.drawChart=function(color){

	this.ctx.clearRect (0,0,nz(2),nz(2));
	this.ctx.beginPath();
	var color = arguments[1] ? arguments[1] : "#000000";
	this.ctx.strokeStyle = color
	this.ctx.arc(300,300,300,Math.PI,-Math.PI,false);
	this.ctx.stroke();
	this.ctx.moveTo(nz(0),nz(1));
	this.ctx.lineTo(nz(2),nz(1));
	this.ctx.moveTo(nz(1),nz(0));
	this.ctx.lineTo(nz(1),nz(2));
	var list1=[];
	//draw losts of ZRe
	list1.push(0.2,0.5,1,3,10);
	var i;
    for(i in list1) {
        this.drawZRe(list1[i]);    //用高阶函数map的话，代码的B格确实提高了一个档次，然而js的高阶函数是个坑
    }                              //js并不能用句法来判断this是什么。如果用lambda表达式的话可以，但兼容性不好
	var list2=[];                  //老老实实用for语句吧
	//draw losts of ZIm
	list2.push(0,0.2,0.5,1,3,10);


		function inve(x){
			return -x;
		}

	var list22=list2.map(inve);
	list2=list2.concat(list22);
	for(i in list2){
        this.drawZIm(list2[i]);
    }

    this.ctx.stroke();
	this.ctx.font = "15px Arial";
	//绘制角度
	this.ctx.fillText("0",590,300);
	this.ctx.fillText("30",559,150);
	this.ctx.fillText("60",450, 41);
	this.ctx.fillText("90", 293, 10);
	this.ctx.fillText("120",136, 33);
	this.ctx.fillText("150", 20, 145);
	this.ctx.fillText("180", 1, 300);
	this.ctx.fillText("-30",559,450);
	this.ctx.fillText("-60",450, 559);
	this.ctx.fillText("-90", 293, 590);
	this.ctx.fillText("-120",136, 567);
	this.ctx.fillText("-150", 20, 455);

	//绘制Z_Re
	this.ctx.fillText("1.0",300,300);
	this.ctx.fillText("3.0", 450, 300);
	this.ctx.fillText("10.0", 550,300);
	this.ctx.fillText("0.5", 200,300);
	this.ctx.fillText("0.2", 100,300);

	//绘制Z_Im
	this.ctx.fillText("0.2", 300,280);
	this.ctx.fillText("0.5", 330,230);
	this.ctx.fillText("1", 310, 110);
	this.ctx.fillText("3", 500, 220);
	this.ctx.fillText("-0.2", 300,320);
	this.ctx.fillText("-0.5", 330,370);
	this.ctx.fillText("-1", 310, 490);
	this.ctx.fillText("-3", 500, 380);
	this.ctx.beginPath();
	this.ctx.strokeStyle="#00ff00";
	for(i in matchList){
		if(i == '0'){
			this.ctx.moveTo(matchList[i].x, matchList[i].y);
		}
		else{
			this.ctx.lineTo(matchList[i].x, matchList[i].y);
		}
	}
	this.ctx.stroke();
};



// 画同心扇形（算输入阻抗和阻抗匹配时可能需要用）
SmithChart.prototype.drawArc=function(start, angle, color){

};


function impedence2coord(impedence){
	var gamma = impedence2gamma(impedence);
	var x = (gamma.r + 1.0)*300.0;
	var y = (1.0 - gamma.i)*300.0;
	return new Coord(x,y);
}

//alert("同学您好！130222班 杨力同学诚招女友，微信：“yangliTXWD”，非诚勿扰~");
function Coord(x, y){
	this.x = x;
	this.y = y;
}