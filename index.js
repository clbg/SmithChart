'use strict';
var ctx = document.getElementById("cv").getContext("2d");
var smithChart = new SmithChart(ctx);

function setValue(x, id){
    document.getElementById(id).value = x.toFixed(2).toString();
}

function getValue(id){
    return parseFloat(document.getElementById(id).value);
}

function getIntValue(id){
    return parseInt(document.getElementById(id).value);
}

function updateValueAndChart(value){
    var impedence, gamma;
    if(typeof (value) == "object"){
        if(value.gamma != null){
            impedence = gamma2impedence(value.gamma);
            gamma = value.gamma;
            oldUpdate(gamma, impedence);
        }
        else if(value.impedence != null){
            gamma = impedence2gamma(value.impedence);
            impedence = value.impedence;
            oldUpdate(gamma, impedence);
        }
    }

    function oldUpdate(gamma, impedence){
        setValue(impedence.r, "ZL_re");
        setValue(impedence.i, "ZL_im");
        smithChart.drawChart();
        smithChart.drawZIm(impedence.i, "#FF0000");
        smithChart.drawZRe(impedence.r, "#FF0000");

        setValue(gamma.r, "gamma_re");
        setValue(gamma.i, "gamma_im");
        setValue(gamma.mag(), "gamma_r");
        setValue(gamma.angle()*(180.0/Math.PI), "gamma_theta");
    }
}

function gammaRiOK(){
    var fn = function(x, y){
        var gamma = new Complex(x, y);
        updateValueAndChart({gamma: gamma});
    };
    fn(getValue("gamma_re"), getValue("gamma_im"));
}

function gammaRtOK(){
    var fn = function(x, y){
        var gamma = new Complex({angle: getValue("gamma_theta")*(Math.PI/180.0), mag: getValue("gamma_r")});
        updateValueAndChart({gamma: gamma});
    };
    fn(getValue("gamma_re"), getValue("gamma_im"));
}

function ZRiOK(){
    var fn = function(x, y){
        var impedence = new Complex(x, y);
        updateValueAndChart({impedence: impedence});
    };
    fn(getValue("ZL_re"), getValue("ZL_im"));
}

var cvFixed = 0;

function getX(obj){
   var tmp = obj.offsetLeft;
   var val = obj.offsetParent;
   while(val != null){
       tmp += val.offsetLeft;
       val = val.offsetParent;
   }
   return tmp;
}

function getY(obj){
   var tmp = obj.offsetTop;
   var val = obj.offsetParent;
   while(val != null){
     tmp += val.offsetTop;
     val = val.offsetParent;
   }
   return tmp;
}

function cvMove(e){
  if(cvFixed == 0){
    var x = e.clientX;
    var y = e.clientY;
    var cv = document.getElementById("cv");
    x = x - getX(cv) + document.body.scrollLeft;
    y = y - getY(cv) + document.body.scrollTop;
    x = x / 300.0 - 1.0;
    y = 1.0 - y / 300.0;
    var gamma = new Complex(x, y);
    if(gamma.mag() < 1.0){
      updateValueAndChart({gamma:gamma});
    }
  }
}

function cvClick(){
  if(cvFixed == 0){
    cvFixed = 1;
  }
  else{
    cvFixed = 0;
  }
}

smithChart.drawChart();
var match = new Match("R_I","R_A","order","freq","high",ctx);
function startMatch(){
    match.matchall();

}



