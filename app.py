from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image
from tensorflow.keras.models import load_model
import segmentation_models as sm
from sklearn.preprocessing import MinMaxScaler
import io
import matplotlib.pyplot as plt
import random

app = Flask(__name__)
CORS(app)

BACKBONE = 'resnet34'
preprocess_input = sm.get_preprocessing(BACKBONE)
scaler = MinMaxScaler()
model = load_model("./Unet-resnet.hdf5", compile=False)

def preprocess_single_image(image_data, patch_size):

    image = Image.open(image_data).convert('RGB')
    width, height = image.size
    x = random.randint(0, width - patch_size)
    y = random.randint(0, height - patch_size)
    image = image.crop((x, y, x + patch_size, y + patch_size))
    single_patch_img = np.array(image)
    single_patch_img = scaler.fit_transform(single_patch_img.reshape(-1, single_patch_img.shape[-1])).reshape(single_patch_img.shape)
    return single_patch_img

@app.route('/process_image', methods=['POST'])
def process_image():
    try:
        image_file = request.files['image']
        patch_size = 256
        preprocessed_image = preprocess_single_image(image_file, patch_size)
        plt.imsave('front-end/original_img.jpg', preprocessed_image)

        test_img_input = np.expand_dims(preprocessed_image, 0)
        test_img_input = preprocess_input(test_img_input)

        prediction = model.predict(test_img_input)
        predicted_img = np.argmax(prediction, axis=3)[0,:,:]
        # Save the image for debugging purpose
        plt.imsave('front-end/predicted_img.jpg', predicted_img)


        return jsonify({'success': True, 'message': 'Image processed and saved successfully.'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
