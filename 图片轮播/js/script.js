
window.onload = function () {
    var container = document.getElementsByClassName('container')[0];
    var Carousel = document.getElementsByClassName('Carousel')[0];
    var btn_next = document.getElementsByClassName('btn_next')[0];
    var btn_previous = document.getElementsByClassName('btn_previous')[0];
    var btn_bottom = document.getElementsByClassName('btn_bottom')[0].getElementsByTagName('a');
    var index = 1;
    var time = 300;
    var interval = 15;
    var animated = false;   //判断动画状态的开关

    function animate(offset) {
        if (animated){
            return;
        }
        animated = true;
        var newleft = parseInt(Carousel.style.left) + offset;
        var speed = offset/(time/interval);

        function go() {
            if ((speed < 0 && parseInt(Carousel.style.left) + speed > newleft) || (speed > 0 && parseInt(Carousel.style.left) + speed < newleft)){
                Carousel.style.left = parseInt(Carousel.style.left) + speed + 'px';
                setTimeout(go,interval);
            }
            else {
                Carousel.style.left = newleft + 'px';
                if (parseInt(Carousel.style.left) == -4500) {
                    Carousel.style.left = -750 + 'px';
                }
                if (parseInt(Carousel.style.left) == 0) {
                    Carousel.style.left = -3750 + 'px';
                }
                animated = false;
            }
        }
        go();
    }
    function showBtn() {
        for (var i = 0; i < btn_bottom.length; i++) {
            if (btn_bottom[i].className = 'on') {
                btn_bottom[i].className = '';
            }
        }
        btn_bottom[index - 1].className = 'on';
    }
    function play() {
        timer = setTimeout(function (){
            btn_next.onclick();
            play();
        },1500)
    }
    function stop() {
        clearInterval(timer);
    }
    btn_next.onclick = function () {
            animate(-750);
            if (index == 5) {
                index = 0;
            }
            index += 1;
            showBtn();
        }
    btn_previous.onclick = function () {
            animate(750);
            if (index == 1) {
                index = 6;
            }
            index -= 1;
            showBtn();
        }
    for (var m = 0; m < btn_bottom.length; m++) {
            btn_bottom[m].onclick = function () {
                if (animated){
                    return;
                }
                var myIndex = parseInt(this.getAttribute('tabindex'));
                var offset = -750 * (myIndex - index);
                animate(offset);

                index = myIndex;
                showBtn();
            }
        }
    container.onmouseover = stop;
    container.onmouseout = play;

    play();
}

