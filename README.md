# Multiclass Semantic Segmentation using U-Net with ResNet34 Backbone

## Overview
This project focuses on semantic segmentation of aerial imagery using a U-Net architecture with a ResNet34 backbone. The dataset used for this project was obtained from Kaggle and consists of 72 images of varying sizes, each accompanied by a mask highlighting different classes within the images.

## Methodology

### 1. Data Acquisition
The dataset was sourced from Kaggle, specifically the "Semantic Segmentation of Aerial Imagery" dataset. It includes 72 images and their corresponding masks, highlighting different parts of the images.

### 2. Data Preprocessing
#### i. Patchification and Standardization
- The images were patchified into 256x256 pixel patches, resulting in a total of 1305 images and masks.
- Intensity values were standardized to a range of 0 to 1 using the `minMaxScaler` function.

#### ii. ResNet Model Preprocessing Integration
- The preprocessing function of the ResNet34 model was used to fine-tune the images for compatibility with the ResNet34 model, which was used as the encoder part of the U-Net architecture.

### 3. Model Selection
#### i. U-Net Architecture for Segmentation
- The U-Net architecture was chosen for its effectiveness in image segmentation tasks, especially with small datasets.
- The model was designed with 16 convolutional filters, increasing to 256 on the encoder side and decreasing back to 16 on the decoder side.
- Dropouts were set at 20% to prevent overfitting.
- The model was trained for 100 epochs with a batch size of 4, using a loss function of `focal_loss + dice_loss`.
- Initial model accuracy was 65% with a Jaccard coefficient of 0.51.

#### ii. Leveraging ResNet34 Backbone
- The ResNet34 backbone was integrated to enhance feature extraction capabilities.
- This pre-trained model significantly improved the segmentation performance, increasing the Jaccard coefficient.

### 4. Model Training
- The final model used a U-Net architecture with a ResNet34 backbone.
- Hyperparameters included a batch size of 4 and training for 100 epochs.
- The optimizer used was Adam, and the loss function was categorical cross-entropy loss.
- Metrics tracked were accuracy and Jaccard coefficient.

## Results and Analysis
- The final model achieved an accuracy of 85% and a Jaccard coefficient of 0.755, a significant improvement over the initial model.
- The model performed well overall, though it showed some limitations in segmenting vegetation due to the dataset's characteristics.

## Conclusion
While the U-Net architecture with a ResNet34 backbone showed significant improvements in segmenting high-resolution satellite imagery, several limitations were identified:
- The dataset's lack of vegetative features impacted the model's performance in accurately segmenting vegetation.
- The model's adaptability was hindered by differences in image quality between high-resolution satellite images and lower-quality images from sources like Google Maps.

### Future Enhancements
- Diversifying the dataset to include imagery from a broader range of locations.
- Incorporating masked images from widely accessible satellite repositories like Google Maps to improve the model's generalization across different landscapes and features.

## Installation
To run this project, you need to have Python installed along with the following libraries:
- TensorFlow
- Keras
- OpenCV
- NumPy
- Matplotlib
- Scikit-learn
- Patchify
- Segmentation Models

You can install the required libraries using pip:
```bash
pip install tensorflow keras opencv-python numpy matplotlib scikit-learn patchify segmentation-models
