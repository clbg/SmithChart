'use strict';

var canvas = document.getElementById("cv");
var ctx = canvas.getContext("2d");
var smithChart = new SmithChart(ctx);

function setValue(x, id){
  document.getElementById(id).value = x.toFixed(2).toString();
}

function getValue(id){
  return parseFloat(document.getElementById(id).value);
}

function updateValueAndChart(impedence, gamma){
  setValue(impedence.r, "ZL_re");
  setValue(impedence.i, "ZL_im");
  smithChart.drawChart();
  smithChart.drawZIm(impedence.i, "#FF0000");
  smithChart.drawZRe(impedence.r, "#FF0000");

  setValue(gamma.r, "gamma_re");
  setValue(gamma.i, "gamma_im");
  setValue(gamma.mag(), "gamma_r");
  setValue(gamma.angle(), "gamma_theta");
}

function gammaRiOK(){
  var fn = function(x, y){
    var gamma = new Complex(x, y);
    var impedence = new Complex(1,0).add(gamma).mul(new Complex(1,0).add(gamma.neg()).inv());
    updateValueAndChart(impedence, gamma);
  };
  fn(getValue("gamma_re"), getValue("gamma_im"));
}

function gammaRtOK(){
  var fn = function(x, y){
    var gamma = new Complex({angle: getValue("gamma_theta"), mag: getValue("gamma_r")});
    var impedence = new Complex(1,0).add(gamma).mul(new Complex(1,0).add(gamma.neg()).inv());
    updateValueAndChart(impedence, gamma);
  };
  fn(getValue("gamma_re"), getValue("gamma_im"));
}

function ZRiOK(){
  var fn = function(x, y){
    var impedence = new Complex(x, y);
    var gamma = new Complex(-1,0).add(impedence).mul(new Complex(1,0).add(impedence).inv());
    updateValueAndChart(impedence, gamma);
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
    var impedence = new Complex(1,0).add(gamma).mul(new Complex(1,0).add(gamma.neg()).inv());
    if(gamma.mag() < 1.0){
      updateValueAndChart(impedence, gamma);
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
