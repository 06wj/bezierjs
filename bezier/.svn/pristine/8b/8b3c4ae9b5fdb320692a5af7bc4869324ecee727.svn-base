var Point = function(x, y){
	this.x = x;
	this.y = y;
};

var Bezier = function(){
	var args = arguments;
	if(args.length == 4){
		this.p0 = args[0];
		this.p1 = args[1];
		this.p2 = args[2];
		this.p3 = args[3];
	}
	else if(args.length == 8){
		this.p0 = new Point(args[0], args[1]);
		this.p1 = new Point(args[2], args[3]);
		this.p2 = new Point(args[4], args[5]);
		this.p3 = new Point(args[6], args[7]);
	}

	this.TOTAL_SIMPSON_STEP = 100;
	this.length = this.getLength(1);
};

Bezier.prototype.getPoint = function(t){
	var it = 1-t, it2 = it*it, it3 = it2*it;
	var t2 = t*t, t3 = t2*t;
	return new Point(it3*this.p0.x + 3*it2*t*this.p1.x + 3*it*t2*this.p2.x + t3*this.p3.x,
		it3*this.p0.y + 3*it2*t*this.p1.y + 3*it*t2*this.p2.y + t3*this.p3.y
	);
};

Bezier.prototype.getSpeed = function(t){
	var it = 1-t, it2 = it*it, t2 = t*t;
	return new Point(-3*this.p0.x*it2 + 3*this.p1.x*it2 - 6*this.p1.x*it*t + 6*this.p2.x*it*t - 3*this.p2.x*t2 + 3*this.p3.x*t2,
		-3*this.p0.y*it2 + 3*this.p1.y*it2 - 6*this.p1.y*it*t + 6*this.p2.y*it*t - 3*this.p2.y*t2 + 3*this.p3.y*t2
	);
};

Bezier.prototype.getSpeedLength = function(t){
	var p = this.getSpeed(t);
	return Math.sqrt(p.x*p.x + p.y*p.y);
};

Bezier.prototype.getLength = function(t){
	var stepCounts = parseInt(this.TOTAL_SIMPSON_STEP*t), i;
	
	if(stepCounts & 1) stepCounts++;
	if(stepCounts==0) return 0.0;

	var halfCounts = stepCounts>>1;
	var sum1=0, sum2=0;
	var dStep = t/stepCounts;

	for(i=0; i<halfCounts; i++){
		sum1 += this.getSpeedLength((2*i+1)*dStep);
	}
	for(i = 1; i<halfCounts; i++){
		sum2 += this.getSpeedLength((2*i)*dStep);
	}

	return (this.getSpeedLength(0)+this.getSpeedLength(1)+2*sum2+4*sum1)*dStep/3;
};

Bezier.prototype.getPointByLen = function(len){
	if(len > this.length){
		return this.p3;
	}

	var t1 = len/this.length, t2;
	do
	{
		t2 = t1 - (this.getLength(t1)-len)/this.getSpeedLength(t1);
		if(Math.abs(t1-t2)<0.01) break;

		t1=t2;

	}while(true);
	return this.getPoint(t2);
};

var Test = function(fun, arg, n, caller){
	var t = +new Date();
	var n = n||1;
	for(var i = 0;i < n;i++){
		fun(arg);
	}
	console.log(+new Date() - t);
}

var p0 = new Point(50,50), p1 = new Point(300,600), p2 = new Point(600,600), p3 = new Point(800,200);