from flask import Flask, request, jsonify
from ultralytics import YOLO
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import base64
from groq import Groq
from dotenv import load_dotenv
import os


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
load_dotenv()

with app.app_context():
    app.predictor = YOLO("trained-yolo.pt")
    app.client = Groq(api_key=os.getenv("GROQ_API_KEY"),)


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
        "objects": list(objects),
        "image": base64_image
    })

@app.route('/recipes', methods=['GET'])
def findRecipes():

    response = app.client.chat.completions.create(
    model="gemma2-9b-it",
    messages = [
    {
        "role": "system",
        "content": (
            "You are a recipes API. You take in a list of ingredients and return a diverse list of easy-to-make, culturally varied recipes. "
            "Respond **only** with valid JSON in the following format:\n\n"
            "{\n"
            "  \"recipes\": [\n"
            "    {\n"
            "      \"title\": \"Name of the recipe\",\n"
            "      \"description\": \"Short 1-2 sentence summary of the dish\",\n"
            "      \"url\": \"https://example.com/recipe-link\",\n"
            "      \"cook_time_minutes\": 30,\n"
            "      \"keywords\": [\"quick\", \"vegetarian\"]\n"
            "    },\n"
            "    ... (5-6 total recipes)\n"
            "  ]\n"
            "}\n\n"
            "Requirements:\n"
            "- Only use the provided ingredients + essential pantry items (oil, salt, pepper, etc.)\n"
            "- Recipes must be easy, quick, suitable for college students\n"
            "- Culturally diverse (e.g., Asian, Italian, Mexican, etc.)\n"
            "- Use **only valid, unbroken recipe links** from trusted sources\n"
            "- Do not include any extra commentary or markdown — return JSON only"
        )
    },
        {
            "role": "user",
            "content": (
                "Here are the ingredients I have:\n"
                "- ground_beef\n"
                "- heavy_cream\n"
                "- green_beans\n"
                "- mushrooms\n"
                "- spinach\n"
                "- strawberries\n"
                "- onion\n"
                "- bread\n"
                "- eggs\n"
                "- butter\n\n"
                "Please return 5 to 6 recipes in the format described above."
            )
        }
    ],
    response_format={"type": "json_object"}
    )
    print(response.choices[0].message.content)


@app.route('/')
def hello_world():
    return 'Hello World!'

