const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const image = new Image();
image.crossOrigin = "anonymous"

// Credits to Chraecker on pixabay
image.src = "owl.png";

const imageSubmit = () => {
    const matrix = document.getElementById("matrix");
    matrix.innerHTML = "";

    if(image.complete){
        for(let i = 0; i < 100; i++){
            let x = (i % 10) * 10;
            let y = Math.floor(i / 10) * 10;

            let pixel = context.getImageData(x,y,1,1)
            let data = pixel.data;
            let rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

            let cell = document.createElement("div");
            cell.textContent = rgba;
            cell.className = "cell";
            matrix.appendChild(cell);
        }
    } else {
        image.addEventListener("load", () => {
            imageSubmit();
        })
    }
}

if(canvas.getContext){
    image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, 100, 100);
        context.beginPath();
        
    }

    if (image.complete) {
        image.onload();
    }

} else {
    alert("BROWSER DOES NOT SUPPORT CANVAS!");
}
