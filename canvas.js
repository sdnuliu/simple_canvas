window.onload = function () {

    var __ret = init();
    var myCanvas = __ret.myCanvas;
    var context = __ret.context;
    var pageWidth = __ret.pageWidth;
    var inMemCanvas = __ret.inMemCanvas;
    var inMemCtx = __ret.inMemCtx;

    window.onresize = function (ev) {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        inMemCanvas.width = pageWidth
        inMemCanvas.height = pageHeight
        inMemCtx.drawImage(myCanvas, 0, 0);
        if (pageWidth > myCanvas.width) {
            myCanvas.width = pageWidth
            myCanvas.height = pageHeight
            context.fillStyle = 'aquamarine'
            context.fillRect(0, 0, myCanvas.width, myCanvas.height)

        }
        context.drawImage(inMemCanvas, 0, 0);
    }

    var lastPoinit = {
        'x': undefined,
        'y': undefined
    }

    var isUsing = false;//是否正在使用的状态标记

    var isEraser = false;//是否是橡皮擦状态

    var penColor = 'red'//画笔颜色

    var actions = document.getElementById('actions')
    var eraser = document.getElementById('eraser')
    var pen = document.getElementById('pen')
    var clear = document.getElementById('clear')
    var download = document.getElementById('download')
    var redPen = document.getElementById('red')
    var yellowPen = document.getElementById('yellow')
    var bluePen = document.getElementById('blue')
    onclickEvent();
    if (document.body.ontouchstart === undefined) {
        console.log('ssssssssssssss')
        //非触屏设备
        onMouseEvent();
    } else {
        //触屏设备
        onTouchEvent();
    }

    function init() {
        var myCanvas = document.getElementById('mananas')
        //获取上下文
        var context = myCanvas.getContext('2d')
        //修改canvas的宽度和高度
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        myCanvas.width = pageWidth
        myCanvas.height = pageHeight
        context.fillStyle = 'aquamarine'
        context.fillRect(0, 0, myCanvas.width, myCanvas.height)

        //// Make our in-memory canvas
        var inMemCanvas = document.createElement('canvas')
        var inMemCtx = inMemCanvas.getContext('2d')
        inMemCanvas.width = pageWidth
        inMemCanvas.height = pageHeight
        inMemCtx.fillStyle = 'aquamarine'
        inMemCtx.fillRect(0, 0, inMemCanvas.width, inMemCanvas.height)
        return {
            myCanvas: myCanvas,
            context: context,
            pageWidth: pageWidth,
            inMemCanvas: inMemCanvas,
            inMemCtx: inMemCtx
        };
    }

    function onTouchEvent() {
        myCanvas.ontouchstart = function (touchStartEv) {
            var startX = touchStartEv.touches[0].clientX
            var startY = touchStartEv.touches[0].clientY
            console.log(startX)
            console.log(startY)
            onMouseOrTouchDown(startX, startY)
        }
        myCanvas.ontouchmove = function (touchMoveEv) {
            var moveX = touchMoveEv.touches[0].clientX
            var moveY = touchMoveEv.touches[0].clientY
            if (!isUsing) return
            onMouseOrTouchMove(moveX, moveY)

        }
        myCanvas.ontouchend = function () {
            isUsing = false
        }
    }

    function onclickEvent() {
        eraser.onclick = function (clickEv) {
            if (!eraser.classList.contains('active')) {
                eraser.classList.add('active')
            }
            pen.classList.remove('active')
            isEraser = true
        }
        pen.onclick = function (ev) {
            if (!pen.classList.contains('active')) {
                pen.classList.add('active')
            }
            eraser.classList.remove('active')
            isEraser = false
        }
        clear.onclick = function (ev) {
            context.clearRect(0, 0, myCanvas.width, myCanvas.height)
        }
        download.onclick = function (ev) {
            var url = inMemCanvas.toDataURL('image/png')
            var a = document.createElement('a')
            document.body.appendChild(a)
            a.href = url
            a.download = '作品'
            a.target = '_blank'
            a.click()
        }
        redPen.onclick = function (ev) {
            penColor = 'red'
            if (!redPen.classList.contains('active')) {
                redPen.classList.add('active')
            }
            yellowPen.classList.remove('active')
            bluePen.classList.remove('active')
        }
        yellowPen.onclick = function (ev) {
            penColor = 'yellow'
            redPen.classList.remove('active')
            if (!yellowPen.classList.contains('active')) {
                yellowPen.classList.add('active')
            }
            bluePen.classList.remove('active')
        }
        bluePen.onclick = function (ev) {
            penColor = 'blue'
            redPen.classList.remove('active')
            yellowPen.classList.remove('active')
            if (!bluePen.classList.contains('active')) {
                bluePen.classList.add('active')
            }
        }


    }

    function onMouseEvent() {
        myCanvas.onmousedown = function (mouseDownEv) {
            //记录摁下的点
            var downX = mouseDownEv.clientX
            var downY = mouseDownEv.clientY
            onMouseOrTouchDown(downX, downY);
        }

        myCanvas.onmousemove = function (mouseMoveEv) {
            var moveX = mouseMoveEv.clientX
            var moveY = mouseMoveEv.clientY
            if (!isUsing) return
            onMouseOrTouchMove(moveX, moveY);
        }

        myCanvas.onmouseup = function (mouseUpEv) {
            isUsing = false
        }
    }

    function onMouseOrTouchDown(downX, downY) {
        lastPoinit.x = downX
        lastPoinit.y = downY
        isUsing = true
    }

    function onMouseOrTouchMove(moveX, moveY) {
        if (isEraser) {
            context.clearRect(moveX - 5, moveY - 5, 10, 10)
        } else {
            //正在使用标记下开始画线
            context.beginPath()
            context.strokeStyle = penColor
            context.moveTo(lastPoinit.x, lastPoinit.y)
            context.lineWidth = 5
            //lineTo  不要写错了
            context.lineTo(moveX, moveY)
            context.stroke()
            context.closePath()
        }
        lastPoinit.x = moveX
        lastPoinit.y = moveY
    }

}
