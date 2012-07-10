(function(win){
	
	var Particle = win.Particle = function(x, y, data)
	{
		this.preX = this.x = x;
		this.preY = this.y = y;
		this.data = data;
		
		this.speedx  = this.speedy = 0;
		this.time = .95;
	};

	Particle.prototype.update = function()
	{
		var localx = this.preX - this.x;
		var localy = this.preY - this.y;
		var orgin_dis = Math.sqrt(localx * localx + localy * localy);
			
		var relax = mouse.x - this.x;
		var relay = mouse.y - this.y;
		var mous_dis = Math.sqrt(relax * relax + relay * relay);
			
			if (mous_dis + Math.random() * mous_dis < 260){
				if (mous_dis){
					this.time = 1;
					this.speedx += relax / mous_dis;
					this.speedy += relay / mous_dis;
				}
			}
			else if(orgin_dis){
				this.speedx += localx / orgin_dis;
				this.speedy += localy / orgin_dis;
			}
			
			this.x += this.speedx * this.time;
			this.speedx = this.speedx * this.time;
			
			this.y += this.speedy* this.time;
			this.speedy = this.speedy * this.time;
			win.speed = 5;
			this.speedy = this.speedy > speed?speed:this.speedy;
			this.speedx = this.speedx > speed?speed:this.speedx;
			
			this.time -=0.001;

			var reman = Math.abs(this.speedx) + Math.abs(this.speedy) + Math.abs(localx) + Math.abs(localy);
	
			if (reman < 5){
				this.time = this.time - 0.1;
				if (reman < 1){
					this.x = this.preX;
					this.y = this.preY;
					this.speedx = 0;
					this.speedy = 0;
				}
			}
			
			this.time = Math.max(this.time, 0.1);
	};
})(window)