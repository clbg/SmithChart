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
	this.ctx.strokeStyle = color
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
    var R;
	//draw losts of ZRe
	for(R=0.1;R<1;R=R+0.1)
		list1.push(R)
	for(R=1;R<2;R=R+0.2)
		list1.push(R);
	for(R=2;R<5;R=R+1)
		list1.push(R);
	list1.push(5,10,20,50);
    for(i in list1) {
        this.drawZRe(list1[i]);    //用高阶函数map的话，代码的B格确实提高了一个档次，然而js的高阶函数是个坑
    }                              //js并不能用句法来判断this是什么。如果用lambda表达式的话可以，但兼容性不好
	var list2=[];                  //老老实实用for语句吧
	//draw losts of ZIm

	for(R =0;R <1; R=R+0.1)
		list2.push(R);
	for(R=1;R<2;R=R+0.2)
		list2.push(R);
	for(R=2;R<5;R=R+1)
		list2.push(R);
	list2.push(5,10,20,50);


		function inve(x){
			return -x;
		}

	list22=list2.map(inve);
	list2=list2.concat(list22);
	for(i in list2){
        this.drawZIm(list2[i]);
    }

    this.ctx.stroke();
};



// 画同心扇形（算输入阻抗和阻抗匹配时可能需要用）
SmithChart.prototype.drawArc=function(start, angle, color){

};



//alert("同学您好！130222班 杨力同学诚招女友，微信：“yangliTXWD”，非诚勿扰~");
