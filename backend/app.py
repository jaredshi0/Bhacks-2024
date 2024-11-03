from .TextRec.ocr_component import OCR
from flask import Flask, render_template, jsonify, request
import cv2
from .llm.receiptParser import parse_receipt
from .llm.recipeGeneratorMultiple import generate_multiple_recipes
import base64
import numpy as np
from .database.mongodb import add_ingredient, remove_ingredient, search_ingredient, store_ingredients, Ingredient, all_ingredients, exists
from typing import List, Optional

app = Flask(__name__)

missing_info_response = {
    "code": 400,
    "message": "Missing information"
}

success_response = {
    "code": 200,
    "message": "Success"
}

'''
TO DO:
- Process Image: Done
- Get Ingredients: Done
- Add Ingredient: Done
- Remove Ingredients: Done
- Update Ingredient: Not Started
- Generate Recipe: Not Started
- Save Recipes: Not Started
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
        return missing_info_response
    
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

    for ingredient in ingredients:
        add_ingredient(ingredient)

    return success_response

@app.route('/generate_multiple_recipe', methods=['GET'])
def generate_multiple():
    '''
    High Level:
    - Get the ingredients from the request or from DB
    - Pass the ingredients to the LLM
    - Get the recipes
    - Return the recipes
    '''

    # Get ingredients from request
    ingredients = all_ingredients()

    # Pass the ingredients to the LLM
    recipes = generate_multiple_recipes(ingredients)

    return jsonify(recipes)

@app.route('/new_ingredient', methods=['POST'])
def new_ingredient():
    '''
    High Level:
    - Get the ingredient from the request
    - Add the ingredient to the DB
    - Return the ingredient
    '''

    data = request.get_json()

    ingredient_name = data.get('ingredient')
    ingredient_quantity = data.get('quantity')


    if ingredient_name == None:
        return missing_info_response
    
    # Check if an element with ingredient_name already exists
    if exists(ingredient_name) != None:
        # Remove it 
        remove_ingredient(ingredient_name)

    if ingredient_quantity != None:
        new_ingredient = Ingredient(name=ingredient_name, quantity=ingredient_quantity)
    else:
        new_ingredient = Ingredient(name=ingredient_name)

    add_ingredient(new_ingredient)

    return success_response

@app.route('/remove_ingredient', methods=['DELETE'])
def remove_ingredient():
    data = request.get_json()

    ingredient_name = data['ingredient']

    if ingredient_name == None:
        return missing_info_response

    remove_ingredient(ingredient_name)

    return success_response

@app.route('/get_ingredients', methods=['GET'])
def get_ingredients():
    '''
    High Level:
    - Get all ingredients from the DB
    - Return the ingredients
    '''
    ingredients = all_ingredients()
    return jsonify(ingredients)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)