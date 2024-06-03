# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, GlobalAveragePooling2D, BatchNormalization, Dropout, Dense
from tensorflow.keras.applications import InceptionV3
from tensorflow.keras.preprocessing.image import img_to_array, load_img

app = Flask(__name__)
CORS(app)  # 모든 출처에 대해 CORS 허용

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'src', 'ai', 'uploadImages')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 이 부분은 모델에 따라 결과를 해석하는 로직을 구현해야 합니다.
categories = ['가지볶음', '간장게장', '갈비구이', '갈비찜', '갈비탕', '갈치구이', '갈치조림', '감자전', '감자조림', '감자채볶음', '감자탕', '갓김치', '건새우볶음', '경단', '계란국', '계란말이', '계란찜', '계란후라이', '고등어구이', '고등어조림', '고사리나물', '고추장진미채볶음', '고추튀김', '곰탕_설렁탕', '곱창구이', '곱창전골', '과메기', '김밥', '김치볶음밥', '김치전', '김치찌개', '김치찜', '깍두기', '깻잎장아찌', '꼬막찜', '꽁치조림', '꽈리고추무침', '꿀떡', '나박김치', '누룽지', '닭갈비', '닭계장', '닭볶음탕', '더덕구이', '도라지무침', '도토리묵', '동그랑땡', '동태찌개', '된장찌개', '두부김치', '두부조림', '땅콩조림', '떡갈비', '떡국_만두국', '떡꼬치', '떡볶이', '라면', '라볶이', '막국수', '만두', '매운탕', '멍게', '메추리알장조림', '멸치볶음', '무국', '무생채', '물냉면', '물회', '미역국', '미역줄기볶음', '배추김치', '백김치', '보쌈', '부추김치', '북엇국', '불고기', '비빔냉면', '비빔밥', '산낙지', '삼겹살', '삼계탕', '새우볶음밥', '새우튀김', '생선전', '소세지볶음', '송편', '수육', '수정과', '수제비', '숙주나물', '순대', '순두부찌개', '시금치나물', '시래기국', '식혜', '알밥', '애호박볶음', '약과', '약식', '양념게장', '양념치킨', '어묵볶음', '연근조림', '열무국수', '열무김치', '오이소박이', '오징어채볶음', '오징어튀김', '우엉조림', '유부초밥', '육개장', '육회', '잔치국수', '잡곡밥', '잡채', '장어구이', '장조림', '전복죽', '젓갈', '제육볶음', '조개구이', '조기구이', '족발', '주꾸미볶음', '주먹밥', '짜장면', '짬뽕', '쫄면', '찜닭', '총각김치', '추어탕', '칼국수', '코다리조림', '콩국수', '콩나물국', '콩나물무침', '콩자반', '파김치', '파전', '편육', '피자', '한과', '해물찜', '호박전', '호박죽', '홍어무침', '황태구이', '회무침', '후라이드치킨', '훈제오리']
 # 예: 분류 카테고리

# 이미지 사이즈 및 클래스 개수 정의
image_size = (299, 299)
num_classes = len(categories)

# InceptionV3 모델 불러오기
base_model = InceptionV3(weights='imagenet', include_top=False, input_shape=(image_size[0], image_size[1], 3))

# 사전 학습된 모델의 일부 레이어만 학습 가능하도록 설정
for layer in base_model.layers[:-10]:
    layer.trainable = False

# 커스터마이징을 위한 새로운 레이어 추가
inputs = Input(shape=(image_size[0], image_size[1], 3))
x = base_model(inputs, training=False)
x = GlobalAveragePooling2D()(x)
x = BatchNormalization()(x)
x = Dropout(0.2)(x)
x = Dense(256, activation='relu')(x)
x = BatchNormalization()(x)
x = Dropout(0.2)(x)
outputs = Dense(num_classes, activation='softmax')(x)

model = Model(inputs, outputs)

# 가중치 불러오기
model.load_weights('src/ai/training/cp3.weights.h5')

def prepare_image(image, target):
    # 이미지를 주어진 타겟 크기로 조정하고 배열로 변환
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target)
    image = img_to_array(image)
    image = (image / 255.0 - 0.5) * 2.0  # 이미지 값을 -1에서 1 사이로 정규화
    image = np.expand_dims(image, axis=0)
    return image


@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    # 파일 저장소 객체에서 파일을 저장하고 해당 파일의 경로를 가져옵니다.
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    
    # 파일 경로를 load_img 함수에 전달하여 이미지를 로드합니다.
    image = load_img(file_path, target_size=(299, 299))
    image = prepare_image(image, target=(299, 299))

    prediction = model.predict(image)[0]
    
    # 예측 결과를 정확도를 기준으로 정렬합니다.
    sorted_indices = np.argsort(prediction)[::-1]
    top_categories = [categories[i] for i in sorted_indices[:5]]
    top_probabilities = [float(prediction[i]) for i in sorted_indices[:5]]  # float로 변환

    result = [{'index': int(i), 'category': categories[i], 'probability': float(probability)} for i, probability in zip(sorted_indices[:5], top_probabilities)]

    # result = [{'category': categories, 'probability': probability} for categories, probability in zip(top_categories, top_probabilities)]
    # result = [{'category': categories[i], 'probability': float(prediction[i])} for i in sorted_indices[:5]]

    return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True, port=5000)
