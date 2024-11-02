from .TextRec.ocr_component import OCR
from flask import Flask, render_template, jsonify, request
import cv2

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

@app.route('/generate_recipe', methods=['GET'])
def generate_recipe():
    '''
    High Level:
    - Get the ingredients from the request
    - Pass the ingredients to the LLM
    - Get the recipes
    - Return the recipes
    '''

    # Get ingredients from request
    ingredients = request.json['ingredients']