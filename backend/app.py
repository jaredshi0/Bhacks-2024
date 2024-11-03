from .TextRec.ocr_component import OCR
from flask import Flask, render_template, jsonify, request
import cv2
from .llm.receiptParser import parse_receipt
from .llm.recipeGeneratorMultiple import generate_multiple_recipes
import base64
import numpy as np
from .database.mongodb import add_ingredient, remove_ingredient, search_ingredient, store_ingredients, Ingredient

app = Flask(__name__)

'''
TO DO:
- Process Image: Done
- Get Ingredients: In Progress
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

    for ingredient in ingredients:
        add_ingredient(ingredient)

    return 200

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

@app.route('/new_ingredient', methods=['PUT'])
def new_ingredient():
    '''
    High Level:
    - Get the ingredient from the request
    - Add the ingredient to the DB
    - Return the ingredient
    '''

    data = request.get_json()

    ingredient_name = data['ingredient']
    ingredient_quantity = data['quantity']

    if ingredient_name == None:
        return 400 # Missing ingredient name

    new_ingredient = Ingredient(name = ingredient_name)

    if ingredient_quantity != None:
        new_ingredient.quantity = ingredient_quantity

    add_ingredient(new_ingredient)

    return 200

@app.route('/remove_ingredient', methods=['DELETE'])
def remove_ingredient():
    data = request.get_json()

    ingredient_name = data['ingredient']

    if ingredient_name == None:
        return 400 # Missing ingredient name

    remove_ingredient(ingredient_name)

    return 200

@app.route('/get_ingredients', methods=['GET'])
def get_ingredients():
    '''
    High Level:
    - Get all ingredients from the DB
    - Return the ingredients
    '''
    ...

@app.route('/update_ingredient', methods=['POST'])
def update_ingredient():
    '''
    High Level:
    - Get the ingredient from the request
    - Update the ingredient in the DB
    - Return the ingredient
    '''
    ...

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)