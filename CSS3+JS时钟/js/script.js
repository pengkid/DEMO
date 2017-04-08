window.onload = showTime;

function showTime(){
	var clock = document.getElementById('clock');
	var hourHand = document.getElementById('hourHand');
	var minuteHand = document.getElementById('minuteHand');
	var secondHand = document.getElementById('secondHand');

	var currentTime = new Date();
	var hour = currentTime.getHours();
	var minute = currentTime.getMinutes();
	var second = currentTime.getSeconds();

	seconds = hour * 3600 + minute * 60 + second;				//当前时间下的总秒数
	hourHand.style.transform = 'rotate('+seconds/120+'deg)';	//时针走一圈是12*3600秒
	minuteHand.style.transform = 'rotate('+seconds/10+'deg)';	//分钟走一圈是3600秒
	secondHand.style.transform = 'rotate('+seconds*6+'deg)';	//秒针走一圈是60秒

	timer = setTimeout(showTime,1000);

	for(var i=0; i<60; i++){
		var scale = document.createElement('div');
		scale.id = 'scale';
		scale.style.transform = 'rotate('+i * 6+'deg)';		//每个刻度6度
		clock.appendChild(scale);

		var scalePoint = document.createElement('span');
		scalePoint.id = 'scalePoint';
		scale.appendChild(scalePoint);

		var scaleNum = document.createElement('span');
		scaleNum.id = 'scaleNum';
		scaleNum.style.transform = 'rotate(-'+i * 6+'deg)';	//抵消scale容器的transfrom
		if(i%5 == 0){
			scalePoint.style.height = '15px';
			scaleNum.innerHTML = i/5;
		}
		scale.appendChild(scaleNum);
	}
}