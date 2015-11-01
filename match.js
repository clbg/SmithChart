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
		Q=sqrt(zt/zl-1);
		X1=zt/Q;
		X2=Zl*Q;
		
		
		if (high===1){
			l=X1/(2*Math.PI*f0);
			c=1/(X2*2*Math.PI*f0);
		}
		else{
			l=X2/(2*Math.PI*f0);
			c=1/(X1*2*Math.PI*f0);
		}
	}
	else{
		Q=sqrt(zl/zt-1);
		X1=zt*Q;
		X2=zl/Q;
		
		
		if(high===1){
			l=X2/(2*Math.PI*f0);
			c=1/(X1*2*Math.PI*f0);
		}
		else{
			l=X1/(2*Math.PI*f0);
			c=1/(X2*2*Math.PI*f0);
		}
	}
	arglc.set('L',l);
	arglc.set('C',c);

	drawMatchChart(z0,X1,X2,zl,this.ctx); //根据z0，zl和X1，X2在ctx上画图
	return arglc;
};

function drawMatchChart(z0,X1,X2,high,ctx){

}

Match.prototype.matchall=function(){
	var z0 = getValue(this.z0_id);
	var zl = getValue(this.zl_id);
	var n = getIntValue(this.n_id);
	var f0 = getValue(this.f0_id);
	var high = getIntValue(this.high_id);

	var step=Math.log(zl)-Math.log(z0);
	step=step/n;
	
	var Zall=[]
	for (var i=0;i<n+1;i++){
		Zall.push(Math.exp(Math.log(z0)+step));
	}
	var L=[];
	var C=[];
	var arglc;
	for(i=0;i<n+1;i++){
		arglc=this.matchsingle(z0, Zall[i],Zall[i+1],f0,high);
		L.push(arglc.get('L'));
		C.push(arglc.get('C'));
	}
};