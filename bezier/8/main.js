(function(win){
	window.onload = startup;

	var params = getUrlParams();
	var img = win.html5Img;
	var imgWidth, imgX, imgY;
	var particleWidth = params.pw||3;
	var offset = {x:0, y:0};
	var width = 600, height = 400;
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var particles = [];
	var mouse = win.mouse = {x:0, y:0};
	var fps = 60;

	win.onmousemove = function(e){
			mouse.x = e.clientX - offset.x;
			mouse.y = e.clientY - offset.y;

			if(mouse.x < 0 || mouse.x > width)
			{
				mouse.x = -1000;
			}

			if(mouse.y < 0 || mouse.y > height)
			{
				mouse.y = -1000;
			}
	}

	win.ontouchmove = function(e){
			e.preventDefault();
			mouse.x = e.touches[0].clientX - offset.x;
			mouse.y = e.touches[0].clientY - offset.y;
	}


	function startup()
	{
		init();
		setInterval(update, 1000/fps);	
	}

	function init()
	{
		imgWidth = 300;
		imgX = (width - imgWidth)>>1;
		imgY = (height - imgWidth)>>1;
		particleWidth = particleWidth <= 1?2:particleWidth; 
		canvas.width = width, canvas.height = height;
		document.body.appendChild(canvas);
		offset = getElementOffset(canvas);

		ctx.fillStyle = "rgba(0 ,0, 0, .1)";

		initParticles();
	}

	function initParticles()
	{
		ctx.drawImage(img, imgX, imgY, imgWidth, imgWidth);
		var data = ctx.getImageData(imgX, imgY, imgWidth, imgWidth).data;
		var tmp;

		for(var i = 0,l = imgWidth*imgWidth/particleWidth/particleWidth;i < l;i++)
		{
			var x = (i%(imgWidth/particleWidth) * particleWidth);
			var y = ((i/imgWidth*particleWidth) >>0) * particleWidth;
			var tmpData = ctx.getImageData(imgX + x, imgY + y, particleWidth, particleWidth);
			var isBlack = true;
			for(var j = 3;j < 3 * particleWidth * particleWidth;j+=4)
			{
				if(tmpData.data[j] > .5)
				{
					isBlack = false;
					break;
				}
			}
			if(!isBlack)
			{
				tmp = new Particle(x + imgX, y + imgY, tmpData);
				particles.push(tmp);
			}
		}


		trace(imgX, imgY, particles.length, 1)
		
	}

	function update()
	{
		ctx.fillRect(0, 0, width, height);
		for(var i = 0, l = particles.length;i < l;i++)
		{
			var p = particles[i];
			ctx.putImageData(p.data, p.x, p.y);
			p.update();
		}
	}

})(window);