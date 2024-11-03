from pymongo import MongoClient
from typing import List, Optional
from pydantic import BaseModel
from backend.llm.receiptParser import parse_receipt

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB URI
db = client["ingredient_database"]  # Database name
ingredients_collection = db["ingredients"]  # Collection name

# Define Ingredient schema
class Ingredient(BaseModel):
    name: str
    quantity: Optional[str] = None

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
    for ingredient in ingredients:
        add_ingredient(ingredient)

def all_ingredients():
    return ingredients_collection.find()

# Use existing functions
if __name__ == "__main__":
    # Parse receipt as before
    receipt_scanned = '''potato 1kg'''
    ingredients_list = parse_receipt(receipt_scanned)
    
    # Store each ingredient in MongoDB
    
    store_ingredients(ingredients_list.list)
    
    # Example usage
    add_ingredient(Ingredient(name="Banana", quantity="0.442 kg"))
    search_ingredient("potato")
    # remove_ingredient("potato")

    # # remove everything in db
    # ingredients_collection.delete_many({})

    # print everything in the db
    for ingredient in all_ingredients():
        print(ingredient)
    

