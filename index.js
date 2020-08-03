
let canvas = document.getElementById("canvas")
let actions = document.getElementById("actions")
let ctx = canvas.getContext("2d")
autoSetCanvasSize(canvas)
ctx.fillStyle = 'black'
ctx.strokeStyle = 'black'
ctx.lineCap = 'round'
let lineWidth = 2

listenToMouse(canvas)

/* ** ** */
function listenToMouse(canvas) {
    let using = false
    let lastPoint = {
        x: undefined,
        y: undefined
    }

    // 特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = (e) => {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x,
                    y
                }
            }
            
        }

        canvas.ontouchmove = (e) => {
            let x = e.touches[0].clientX
            let y = e.touches[0].clientY
            if (!using) return
            
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawLine(lastPoint.x, lastPoint.y, x, y)
                lastPoint = {
                    x,
                    y
                }
            }
        }

        canvas.ontouchend = () => {
            using = false
        }
    } else {
        //非触屏设备
        canvas.onmousedown = (e) => {
            let x = e.clientX
            let y = e.clientY
            using = true
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x,
                    y
                }
            }
        }
    
        canvas.onmousemove = (e) => {
            let x = e.clientX
            let y = e.clientY
            if (!using) return
            
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                drawLine(lastPoint.x, lastPoint.y, x, y)
                lastPoint = {
                    x,
                    y
                }
            }
        }
    
        canvas.onmouseup = () => {
            using = false
        }
    }
    
}



/****画线****/

function drawLine (x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineWidth = lineWidth
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

/***画笔颜色***/
black.onclick = () => {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}
red.onclick = () => {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.add('active')
    black.classList.remove('active')
}
green.onclick = () => {
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    red.classList.remove('active')
    blue.classList.remove('active')
    green.classList.add('active')
    black.classList.remove('active')
}
blue.onclick = () => {
    ctx.fillStyle = 'blue'
    ctx.strokeStyle = 'blue'
    green.classList.remove('active')
    red.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}

/***画笔粗细***/
thin.onclick = () => {
    lineWidth = 2
    thin.classList.add('change')
    middle.classList.remove('change')
    thick.classList.remove('change')
}
middle.onclick = () => {
    lineWidth = 4
    thin.classList.remove('change')
    middle.classList.add('change')
    thick.classList.remove('change')
}
thick.onclick = () => {
    lineWidth = 6
    thin.classList.remove('change')
    middle.classList.remove('change')
    thick.classList.add('change')
}
/****画笔 橡皮擦 清空 下载****/

let eraserEnabled = false
pen.onclick = () => {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = () => {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = () => {
    let url = canvas.toDataURL("img/png")
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'img'
    a.click()
}
/***Canvas***/

function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function() {
        setCanvasSize()
    }

    function setCanvasSize() {
        canvas.width =  document.documentElement.clientWidth
        canvas.height =  document.documentElement.clientHeight
    }
}

