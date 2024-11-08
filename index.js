const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

document.getElementById("image-submit").onchange = (e) => {
    const file = e.target.files[0];
    if(file){
        let image = new Image();
        image.onload = () => draw(image);
        image.onerror = failed;
        image.src = URL.createObjectURL(file);
    }
}

const draw = (image) => {
    canvas.width = 100;
    canvas.height = 100;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

const failed = () => {
    console.error("The provided file couldn't be loaded");
}

const displayMatrix = () => {
    const matrix = document.getElementById("matrix");
    matrix.innerHTML = "";

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
}