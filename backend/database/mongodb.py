from pymongo import MongoClient
from typing import List, Optional
from pydantic import BaseModel
from backend.llm.recipeGeneratorMultiple import Recipe

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB URI
db = client["ingredient_database"]  # Database name
ingredients_collection = db["ingredients"]  # Collection name
recipies_collection = db["recipes"]  # Collection name

# Define Ingredient schema
class Ingredient(BaseModel):
    name: str
    quantity: Optional[str] = None

class Recipe(BaseModel):
    recipe_name: str
    ingredients: List[Ingredient]
    directions: List[str]

# Define functions for MongoDB operations

# Add an ingredient
def add_ingredient(ingredient: Ingredient):
    ingredients_collection.insert_one(ingredient.dict())
    print(f"Added {ingredient.name} to the database.")

# Remove an ingredient by name
def remove_ingredient(name: str):
    result = ingredients_collection.delete_one({"name": name})
    if result.deleted_count > 0:
        print(f"Removed {name} from the database.")
    else:
        print(f"{name} not found in the database.")

# Search for an ingredient by name
def search_ingredient(name: str):
    ingredient = ingredients_collection.find_one({"name": name})
    if ingredient:
        print("Ingredient found:", ingredient)
        return Ingredient(**ingredient)
    else:
        print(f"{name} not found in the database.")
        return None

# Store parsed ingredients in MongoDB
def store_ingredients(ingredients: List[Ingredient]):
    for ingredient in ingredients.list:
        add_ingredient(ingredient)

def all_ingredients():
    # return all the ingredients in the database in this format {{name: "name", quantity: "quantity"}, ...}
    return ingredients_collection.find()

##########################
# Recipe Functions
##########################


# Add a Recipe
def add_recipe(recipe: Recipe):
    recipies_collection.insert_one(recipe.dict())
    print(f"Added {recipe.recipe_name} to the database.")

# Remove a Recipe by name
def remove_recipe(name: str):
    result = recipies_collection.delete_one({"recipe_name": name})
    if result.deleted_count > 0:
        print(f"Removed {name} from the database.")
    else:
        print(f"{name} not found in the database.")

def all_recipes():
    # return all the recipes in the database in this format {{recipe_name: "name", ingredients: [{name: "name", quantity: "quantity"}, ...], directions: ["direction1", "direction2", ...]}, ...}
    return recipies_collection.find()

# Use existing functions
if __name__ == "__main__":
    from backend.llm.receiptParser import parse_receipt
    from backend.llm.recipeGeneratorMultiple import generate_multiple_recipes

    for ingredient in all_ingredients():
        print(ingredient)

    # generate recipes
    ingredients = {"ingredients": [{"name": "chicken", "quantity": "1 lb"}, {"name": "rice", "quantity": "1 cup"}]}

    recipes = generate_multiple_recipes(ingredients["ingredients"])

    

