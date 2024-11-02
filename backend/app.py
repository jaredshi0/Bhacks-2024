from .TextRec.ocr_component import OCR
from flask import Flask, render_template, jsonify, request
import cv2
from .llm.receiptParser import parse_receipt
from .llm.recipeGenerator import generate_recipe
from .llm.recipeGeneratorMultiple import generate_recipe_multiple
import base64
import numpy as np

app = Flask(__name__)

'''
TO DO:
- Process Image
- Get Ingredients
- Store Ingredients
- Update Ingredients
- Remove Ingredients
- Generate Recipe
- Save Recipes
'''

@app.route('/store_ingredients', methods=['POST'])
def store_ingredients():
    '''
    High Level: 
    - Get the image from the request
        - Get the base64 string from the http requests
        - Convert the base64 string to an image
    - Pass the image to the OCR function
    - Get The OCR TEXT
    - Have LLM Process the text
    - Return list of ingredients
    '''
    data = request.get_json()

    # If there is an image in the request return 400 
    if not data or 'image' not in data:
        return 'No image provided', 400
    
    base64_image = data['image']

    _, encoded = base64_image.split(',', 1)
    file_data = base64.b64decode(encoded)

    # Convert to nparray
    nparr = np.frombuffer(file_data, np.uint8)

    # Decode image
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Pass the image to the OCR function
    ocr_String = OCR(image)

    # Pass OCR string back to the LLM to process
    ingredients = parse_receipt(ocr_String)

    return jsonify(ingredients)

@app.route('/generate_recipe', methods=['GET'])
def generate_recipe():
    '''
    High Level:
    - Get the ingredients from the request or from DB
    - Pass the ingredients to the LLM
    - Get the recipes
    - Return the recipes
    '''

    # Get ingredients from request
    ingredients = request.json['ingredients']

    # Pass the ingredients to the LLM
    recipes = generate_recipe(ingredients)

    return jsonify(recipes)

@app.route('/generate_recipe_multiple', methods=['GET'])
def generate_recipe_multiple():
    '''
    High Level:
    - Get the ingredients from the request or from DB
    - Pass the ingredients to the LLM
    - Get the recipes
    - Return the recipes
    '''

    # Get ingredients from request
    ingredients = request.json['ingredients']

    # Pass the ingredients to the LLM
    recipes = generate_recipe_multiple(ingredients)

    return jsonify(recipes)