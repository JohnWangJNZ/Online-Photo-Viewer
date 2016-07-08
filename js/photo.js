window.onload = function() {

    var funcs = document.getElementsByTagName('input');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var scale = funcs[1].value;
    var note = document.getElementById('note');
    var oldPos = {};
    var isPressDown = false;
    var isOpen = false;
    //alert(scale);
    canvas.width = 1000;
    canvas.height = 560;
    // alert(canvas.height);
    var img = new Image();

    funcs[0].onchange = function(e) {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            var url = reader.result;
            img.src = url;
            note.innerHTML = "Zoom In: " + scale;
            funcs[1].removeAttribute('disabled');
        }
        reader.readAsDataURL(file);
    }

    img.onload = function() {

        drawImageByScale(scale);

    }

    function drawImageByScale(scale) {
        var imageWidth = scale * canvas.width;
        var imageHeight = scale * canvas.height;
        var dx = canvas.width / 2 - imageWidth / 2;
        var dy = canvas.height / 2 - imageHeight / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, dx, dy, imageWidth, imageHeight);

    }
    funcs[1].onchange = function(e) {
        scale = e.target.value;
        if (scale > 1) {
            note.innerHTML = "Zoom In: " + scale;
        } else {
            note.innerHTML = "Zoom Out: " + scale;
        }
        drawImageByScale(scale);

    }

    function windowToCanvas(x, y) {
        /* body... */
        var bBox = canvas.getBoundingClientRect();
        //alert(x-bBox.left)
        return {
            x: x - bBox.left,
            y: y - bBox.top
        }
    }

    function drawLine(oldPos, curPos) {
        /* body... */
        context.save();
        context.strokeStyle = "#333";
        context.moveTo(oldPos.x, oldPos.y);
        context.lineTo(curPos.x, curPos.y);
        context.stroke();
        context.restore();
    }
    funcs[2].onchange = function(e) {

        /* body... */
        isOpen = true;
        canvas.addEventListener('mousedown', function(e) {
            /* body... */
            e.preventDefault();
            isPressDown = true;

            // console.log(e.clientX+"+++"+e.clientY);
            oldPos = windowToCanvas(e.clientX, e.clientY);
        });
        canvas.addEventListener('mousemove', function(e) {
            /* body... */
            e.preventDefault();
            if (!isPressDown) {
                return;
            }
            if (!isOpen) {
                return;
            }
            var curPos = windowToCanvas(e.clientX, e.clientY);
            drawLine(oldPos, curPos);
            oldPos = curPos;
        });
        canvas.addEventListener('mouseup', function(e) {
            /* body... */
            isPressDown = false;

            e.preventDefault();
        })
    }
    funcs[3].onchange = function(e) {
        /* body... */
        isPressDown = false;
        isOpen = false;
        

    }

}