
window.onload=function () {

	var funcs=document.getElementsByTagName('input');
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');
	var scale=funcs[1].value;
	var note=document.getElementById('note');
	//alert(scale);
    canvas.width=1000;
    canvas.height=560;
   // alert(canvas.height);
	var img=new Image();

	funcs[0].onchange=function (e) {
		var file=this.files[0];
		var reader=new FileReader();
		reader.onload=function () {
			var url=reader.result;
			img.src=url;
			note.innerHTML="Zoom In: "+scale;
			funcs[1].removeAttribute('disabled');
		}
		reader.readAsDataURL(file);
	}

	img.onload = function () {

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
            funcs[1].onchange = function (e) {
                scale = e.target.value;
                if (scale>1) {
                	note.innerHTML="Zoom In: "+scale;
                }else {
                	note.innerHTML="Zoom Out: "+scale;
                }
                drawImageByScale(scale);
                
            }
}
