
var currentPosition = 0;	//当前页面位置
var pagesNum = document.getElementsByClassName("page").length;
var container = document.getElementById("container");

var PageSlide = {

	//入口函数
	app: function(){
		document.addEventListener('DOMContentLoaded',function(){
			PageSlide.bindTouch();
		}, false)
	}(),

	// 滑动动画
	transform: function(translate) {
		this.style.webkitTransform = "translate3d(0,"+translate+"px,0)";
		currentPosition = translate;
	},

	// 触摸事件
	bindTouch: function() {
		var screenHeight = window.innerHeight; 
		var maxHeight = - screenHeight * (pagesNum-1);
		var startX,startY;
		var startPos = 0; //手指按下的位置
		var moveLength = 0; //手指移动距离
		var direction="up"; //手指移动方向
		var isMove = false; //滑动判断

		//start事件
		document.addEventListener("touchstart",function(e){
			e.preventDefault();
			var touch = e.touches[0];
			startX = touch.pageX;
			startY = touch.pageY;
			startPos = currentPosition;	//本次滑动的初始位置
			container.style.webkitTransition = ""; //取消动画效果
			isMove = false; //是否产生滑动
		}, false);

		//move事件
		document.addEventListener("touchmove",function(e){
			e.preventDefault();
			var touch = e.touches[0];
			var moveX = touch.pageX - startX;
			var moveY = touch.pageY - startY;
			if (Math.abs(moveX) < Math.abs(moveY)){
				moveLength = moveY;
				var translate = startPos + moveY;	//需要移动的距离
				if (translate <=0 && translate >= maxHeight){
					this.transform.call(container, translate);
					isMove = true;
				}
				direction = moveY>0?"down":"up"; //判断手指滑动的方向
			}
		}.bind(this),false);

		//end事件
		document.addEventListener("touchend",function(e){
			e.preventDefault();
			var translate = 0;
			if(isMove){
				container.style.webkitTransition = "0.3s ease -webkit-transform";
				if (Math.abs(moveLength)/screenHeight < 0.2){
					translate = currentPosition-moveLength;
				}
				else{
					translate = direction == 'up'?currentPosition-(screenHeight+moveLength):currentPosition+screenHeight-moveLength;
					translate = translate > 0 ? 0 : translate;
					translate = translate < maxHeight ? maxHeight : translate;
				}
				this.transform.call(container, translate);
			}
		}.bind(this),false);
	}
}