//构造函数，ctx为canvas context
function SmithChart(ctx){
  this.ctx = ctx;
}

//画阻抗虚部的圆
SmithChart.prototype.drawZIm = function(ZIm, color){

}

//画阻抗实部的圆
SmithChart.prototype.drawZRe = function(ZRe, color){

}

//画坐标系（横纵轴）
SmithChart.prototype.drawCoord = function(color){

}

//清空背景，然后重新绘制整个圆图（包括两种圆，横纵轴）
SmithChart.prototype.drawChart = function(){

}

//画同心扇形（算输入阻抗和阻抗匹配时可能需要用）
SmithChart.prototype.drawArc = function(start, angle, color){

}
