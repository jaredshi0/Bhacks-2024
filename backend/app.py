from .TextRec.ocr_component import OCR
from flask import Flask, render_template, jsonify, request
from .llm.receiptParser import parse_receipt
from .llm.recipeGeneratorMultiple import generate_multiple_recipes, Recipe
import numpy as np
from .database.mongodb import *
from typing import List, Optional
import json
import cv2
import base64

app = Flask(__name__)

missing_info_response = json.dumps({
    "code": 400,
    "message": "Missing information"
})

success_response = json.dumps({
    "code": 200,
    "message": "Success"
})

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

@app.route('/photo_ingredients', methods=['POST'])
def photo_ingredients():
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
    if 'image' not in request.files:
        print("Missing Image")
        return missing_info_response
    
    print("Image Found")
    image_file = request.files['image']

    file_bytes = np.frombuffer(image_file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    cv2.imshow("Image", image)

    # Pass the image to the OCR function
    ocr_String = OCR(image)

    ocr_String += "Chicken 1 lb"

    # print(ocr_String)

    # Pass OCR string back to the LLM to process
    ingredients = parse_receipt(ocr_String)

    # print(ingredients)
    # print(type(ingredients[0]))
    # print(type(ingredients))

    store_ingredients(ingredients)

    return success_response

@app.route('/manual_ingredient', methods=['POST'])
def manual_ingredient():
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
    if search_ingredient(ingredient_name) != None:
        # Remove it 
        remove_ingredient(ingredient_name)

    if ingredient_quantity != None:
        new_ingredient = Ingredient(name=ingredient_name, quantity=ingredient_quantity)
    else:
        new_ingredient = Ingredient(name=ingredient_name)

    add_ingredient(new_ingredient)

    return success_response

@app.route('/delete_ingredient', methods=['DELETE'])
def delete_ingredient():
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
    
    output = []
    for ingredient in ingredients:
        output.append({
            "name": ingredient['name'],
            "quantity": ingredient['quantity']
        })
    
    return jsonify(output)


#################################
# Endpoints for Recipe Logic
#################################

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
    ingredients = get_ingredients()

    # turn the ingredients into a list of dictionaries it is a json object jsonify(output)
    ingredients = json.loads(ingredients.data)

    # Pass the ingredients to the LLM
    recipes = generate_multiple_recipes(ingredients)

    output = []

    for recipe in recipes:
        output.append(recipe_to_dict(recipe))

    print("generating recipes")

    return jsonify(output)

def ingredient_to_dict(ingredient):
    return {
        "name": ingredient.name,
        "quantity": ingredient.quantity
    }

def recipe_to_dict(recipe):
    return {
        "recipe_name": recipe.recipe_name,
        "ingredients": [ingredient_to_dict(ingredient) for ingredient in recipe.ingredients],
        "directions": recipe.directions
    }

@app.route('/save_recipe', methods=['POST'])
def save_recipe():
    data = request.get_json()

    recipe_name = data.get('recipe_name')
    ingredients_name = data.get('ingredients_name')
    ingredients_quantity = data.get('ingredients_quantity')
    directions = data.get('directions')

    if recipe_name == None or ingredients_name == None or directions == None or len(ingredients_name) != len(ingredients_quantity):
        return missing_info_response

    ingredients = []
    for i in range(len(ingredients_name)):
        if ingredients_quantity[i] != None:
            ingredients.append(Ingredient(name=ingredients_name[i], quantity=ingredients_quantity[i]))
    
    new_recipe = Recipe(recipe_name=recipe_name, ingredients=ingredients, directions=directions)

    add_recipe(new_recipe)

    return success_response

@app.route('/delete_recipe', methods=['DELETE'])
def delete_recipe():
    data = request.get_json()

    recipe_name = data.get('recipe_name')

    if recipe_name == None:
        return missing_info_response

    remove_recipe(recipe_name)

    return success_response

@app.route('/get_recipes', methods=['GET'])
def get_recipes():
    recipes = all_recipes()
    
    output = []
    for recipe in recipes:
        output.append({
            "recipe_name": recipe['recipe_name'],
            "ingredients": recipe['ingredients'],
            "directions": recipe['directions']
        })
    
    return jsonify(output)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)