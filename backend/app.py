from .TextRec.ocr_component import OCR
from flask import Flask, render_template, jsonify, request
import cv2
from .llm.receiptParser import parse_receipt
from .llm.recipeGenerator import generate_recipe
from .llm.recipeGeneratorMultiple import generate_recipe_multiple

app = Flask(__name__)

@app.route('/store_ingredients', methods=['GET'])
def store_ingredients():
    '''
    High Level: 
    - Get the image from the request
    - Pass the image to the OCR function
    - Get The OCR TEXT
    - Have LLM Process the text
    - Return list of ingredients
    '''
    # Get image from request
    image = request.files['image']
    image = cv2.imread(image)

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