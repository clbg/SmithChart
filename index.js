'use strict';
var smithChart = new SmithChart();

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
  smithChart.drawZIm(impedence.i);
  smithChart.drawZRe(impedence.r);

  setValue(gamma.r, "gamma_re");
  setValue(gamma.i, "gamma_im");
}

function gammaRiOK(){
  var fn = function(x, y){
    var gamma = new Complex(x, y);
    var impedence = new Complex(1,0).add(gamma).mul(new Complex(1,0).add(gamma.neg()).inv());
    updateValueAndChart(impedence, gamma);
  }
  fn(getValue("gamma_re"), getValue("gamma_im"));
}

function ZRiOK(){
  var fn = function(x, y){
    var impedence = new Complex(x, y);
    var gamma = new Complex(-1,0).add(impedence).mul(new Complex(1,0).add(impedence).inv());
    updateValueAndChart(impedence, gamma);
  }
  fn(getValue("ZL_re"), getValue("ZL_im"));
}
