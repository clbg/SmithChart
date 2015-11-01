//fo0 Hz; zo zl Ohm
'use strict';

function Match(z0_id,zl_id,n_id,f0_id,high_id,ctx){			//high ===1 ��ͨ
	this.z0_id=z0_id;
	this.zl_id=zl_id;
	this.n_id=n_id;
	this.f0_id=f0_id;
	this.high_id=high_id;
	this.ctx=ctx;
}

Match.prototype.matchsingle=function (z0,zt,zl,f0,high){ //单次阻抗变换，从zl到zt,特征阻抗为z0
	var arglc=new Map();
	var X1,X2;
	var Q;
	var l,c;
	if(zt>zl){
		Q=Math.sqrt(zt/zl-1);
		X1=zt/Q;
		X2=zl*Q;
		if(high == 1){
			X1 = -X1;
		}
		else{
			X2 = -X2;
		}
		drawMatchChart(z0,X1,X2,zl,this.ctx, 0);
		
		
		if (high===1){
			l=X2/(2*Math.PI*f0);
			c=-1/(X1*2*Math.PI*f0);
		}
		else{
			l=X1/(2*Math.PI*f0);
			c=-1/(X2*2*Math.PI*f0);
		}
	}
	else{
		Q=Math.sqrt(zl/zt-1);
		X1=zt*Q;
		X2=zl/Q;
		if(high == 1){
			X2 = -X2;
		}
		else{
			X1 = -X1;
		}
		drawMatchChart(z0,X1,X2,zl,this.ctx, 1);
		if(high===1){
			l=X1/(2*Math.PI*f0);
			c= -1/(X2*2*Math.PI*f0);
		}
		else{
			l=X2/(2*Math.PI*f0);
			c=-1/(X1*2*Math.PI*f0);
		}
	}
	arglc.set('L',l);
	arglc.set('C',c);

 //根据z0，zl和X1，X2在ctx上画图
	return arglc;
};

function drawMatchChart(z0,X1,X2,zl,ctx, a_more_than_i){
	var X10 = X1 / z0;
	var X20 = X2 / z0;
	var zl0 = zl / z0;
	//console.log(X10, X20, zl0);
	var v = 1e-6;
	var t_coord;
	var t_impedence;
	if(a_more_than_i == 1){
		ctx.beginPath();
		ctx.strokeStyle = "#FFFF00";
		matchList.push(impedence2coord(new Complex(zl0, 0)));
		console.log(t_coord);
		for(v = 1e-6; Math.abs(v) <= Math.abs(1.0/X20); v += (1.0/X20)/300.0){
			t_impedence = parallel(new Complex(zl0, 0.0), new Complex(0.0, 1.0/v));
			matchList.push(impedence2coord(t_impedence));
		}
		zl0 = t_impedence;
		for(v = 1e-6; Math.abs(v) <= Math.abs(X10);v += X10/300.0){
			t_impedence = zl0.add(new Complex(0, v));
			matchList.push(impedence2coord(t_impedence));
		}
		smithChart.drawChart();
	}
	else{
		matchList.push(impedence2coord(new Complex(zl0, 0)));
		for(v = 1e-6; Math.abs(v) <= Math.abs(X20); v += X20/300.0){
			t_impedence = new Complex(zl0, 0).add(new Complex(0, v));
			matchList.push(impedence2coord(t_impedence));
		}
		zl0 = t_impedence;
		for(v = 1e-6; Math.abs(v) <= Math.abs(1.0/X10); v += (1.0/X10)/300.0){
			t_impedence = parallel(zl0, new Complex(0.0, 1.0/v));
			matchList.push(impedence2coord(t_impedence));
		}
		smithChart.drawChart();
	}
}


Match.prototype.matchall=function(){
	var z0 = getValue(this.z0_id);
	var zl = getValue(this.zl_id);
	var n = getIntValue(this.n_id);
	var f0 = getValue(this.f0_id);
	var high = getIntValue(this.high_id);

	var step=Math.log(zl)-Math.log(z0);
	step=step/n;
	matchList = [];
	var Zall=[];
	for (var i=0;i<n+1;i++){
		Zall.push(Math.exp(Math.log(z0)+i*step));
	}
	var L=[];
	var C=[];
	var arglc;
	for(i=0;i<n;i++){
		//console.log(Zall[i],Zall[i+1]);
		arglc=this.matchsingle(z0, Zall[i],Zall[i+1],f0,high);
		L.push(arglc.get('L'));
		C.push(arglc.get('C'));
	}

	var s='nPQ';
	if(n===1||n===2){
		s= s.replace(/n/,n);
	}

	if(zl>z0){
		s= s.replace(/P/,"B");
	}
	else{
		s= s.replace(/P/,"S");
	}

	if(high===1){
		s= s.replace(/Q/,"H");
	}
	else{
		s= s.replace(/Q/,"L");
	}
	s="img/"+s+".png";
	document.getElementById("cir_img").src = s;
	var sd="L、C参数如下：<br>"; //S_how wor_D
	for(i=0;i<n;i++){
		sd=sd+"L"+(i+1)+":\t"+L[i].toPrecision(4)+"H<br>";
		sd=sd+"C"+(i+1)+":\t"+C[i].toPrecision(4)+"F<br>"+"<br>";

	}

	document.getElementById("cir_para").innerHTML = sd;





};

function parallel(Z1, Z2){
	return Z1.inv().add(Z2.inv()).inv();
}