from flask import Flask, request, jsonify
from ultralytics import YOLO
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import base64

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

with app.app_context():
    app.predictor = YOLO("trained-yolo.pt")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.files
    image_file = data["image"]
    image = Image.open(image_file.stream)
    objects = set()

    results = app.predictor.predict(image)

    result = results[0]
    for box in result.boxes:
        class_id = result.names[box.cls[0].item()]
        conf = round(box.conf[0].item(), 2)
        if conf > 0.8:
            objects.add(class_id)

    annotated_image = Image.fromarray(result.plot()[:,:,::-1])
     # Encode image to base64

    buffered = BytesIO()
    annotated_image.save(buffered, format="JPEG")  
    base64_image = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return jsonify({
        "result": list(objects),
        "image": base64_image
    })


@app.route('/')
def hello_world():
    return 'Hello World!'
