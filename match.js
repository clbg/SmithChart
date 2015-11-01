//fo0 Hz; zo zl Ohm


function match(z0,zl,n,f0,high,ctx){			//high ===1 ¸ßÍ¨
	this.z0=z0;
	this.zl=zl;
	this.n=n;
	this.f0=f0;
	this.high=high;	
	if(z0===zl){
		return;
	}
	this.ctx=ctx;
}

match.prototype.matchsingle=function (z0,zl,f0,high){
	var arglc=new Map();
	var X1,X2;
	var Q
	var l,c;
	if(z0>zl){
		Q=sqrt(z0/zl-1);
		X1=z0/Q;
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
		Q=sqrt(zl/z0-1);
		X1=z0*Q;
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
	
	return arglc;
}

math.prototype.matchall=function(z0,zl,n,f0,high){
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
		arglc=this.matchsingle(Zall[i],Zall[i+1],f0,high);
		L.push(arglc.get('L'));
		C.push(arglc.get('C'));
	}
	
	
	
	
	
	
	
}