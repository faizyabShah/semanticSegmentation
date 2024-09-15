function uploadImage(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput');
    const imageContainer = document.getElementById('resultContainer');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.setAttribute("id", "image");
        imageContainer.innerHTML = '';
        imageContainer.appendChild(image);
    };

    if (file) {
        reader.readAsDataURL(file);
    }

    const self = document.getElementById("majorbutton");
    self.innerText = "process";
    self.setAttribute("onclick", "processImage(event);"); 
}


function processImage(event) {
    const input = document.getElementById('fileInput');
    const file = input.files[0];

    const formData = new FormData();
    formData.append('image', file);

    fetch('http://127.0.0.1:5000/process_image', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log("resposneee");
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json(); // Parsing the JSON response
    })
    .then(data => {
        if (data.success) {
            
            // reload the page
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.innerHTML = '';
            const originalImage = document.createElement('img');
            const predictedImage = document.createElement('img');
            originalImage.src = "";
            predictedImage.src = "";
            predictedImage.setAttribute("src", "predicted_img.jpg");
            originalImage.setAttribute("src", "original_img.jpg");
            predictedImage.setAttribute("id", "predicted_img");
            originalImage.setAttribute("id", "original_img");
            resultContainer.appendChild(originalImage);
            resultContainer.appendChild(predictedImage);
            console.log("Image processed and displayed successfully!");

            const legend = document.getElementById('legend');
            legend.style.display = "block";
        } else {
            console.error('Error:', data.error);
            console.log("error");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
