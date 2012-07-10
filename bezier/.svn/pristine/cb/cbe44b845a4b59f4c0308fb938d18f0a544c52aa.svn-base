var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640, canvas.height = 480, canvas.style.position = "absolute";
document.body.style.background = "black";
document.body.appendChild(canvas);

var Line = function(x0, y0, x1, y1, col, lineWidth)
{
	this.p0 = new Vector(x0, y0);
	this.p1 = new Vector(x1, y1);

	this.col = col||"#f96";
	this.lineWidth = lineWidth||2;
};

Line.prototype.draw = function(context)
{
	var l = this.p1.minusNew(this.p0);
	var w = this.lineWidth>>1;
	context = context || ctx;

	context.save();
	context.translate(this.p0.x, this.p0.y);
	context.rotate(l.getAngle());

	context.fillStyle = this.col;
	context.shadowBlur = 17; 
	context.shadowColor = this.col||"#f96"; 

	context.fillRect(0, -w, l.getLength(), this.lineWidth);
	context.restore();
};


var Polygon = function(arr, col, lineWidth)
{
	this.lines = [];
	this.arr = arr;
	[].push.call(arr, arr[0]);
	trace(arr,arr.length)
	for(var i = 0, l = arr.length - 1;i < l;i++)
	{
		this.lines.push(new Line(arr[i].x, arr[i].y, arr[i+1].x, arr[i+1].y, col, lineWidth));
	}
};

Polygon.prototype.draw = function(context)
{
	for(var i = 0, l = this.lines.length;i < l;i++)
	{
		this.lines[i].draw(context);
	}
};

var p = new Polygon([{x:120,y:120}, {x:90, y:140}, {x:120,y:160}, {x:150, y:140}]);
p.draw();