# app.py
from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# 모델 로드
model = load_model('path/to/cp3.weights.h5')

# 이미지 전처리 함수
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # 모델에 따라 이 부분이 달라질 수 있습니다.
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file provided'}), 400

    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    img_array = preprocess_image(file_path)
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)[0]

    # 클래스 이름 (필요에 따라 수정)
    class_names = ['class1', 'class2', 'class3']  # 실제 클래스 이름으로 대체
    result = class_names[predicted_class]

    os.remove(file_path)  # 파일 삭제

    return jsonify({'predicted_class': result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3001)
