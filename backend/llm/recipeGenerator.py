'''
Uses groq to generate a recipe based on a list of ingredients
'''

from backend.config import GROQ_API_KEY
from groq import Groq
from typing import List, Optional
import json

from pydantic import BaseModel

# Data model for LLM to generate
class Ingredient(BaseModel):
    name: str
    quantity: str
    quantity_unit: Optional[str]


class Recipe(BaseModel):
    recipe_name: str
    ingredients: List[Ingredient]
    directions: List[str]

def generate_recipe_groq(ingredients):

    # get ingredients list from backend
    ingredients_list = [ingredient['name'] for ingredient in ingredients]
    ingredients_toString = ", ".join(ingredients_list)

    client = Groq(api_key=GROQ_API_KEY)

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a a chef that is looking to create new recipes. You have a list of ingredients and you want to create recipes using some of them."
                f" The JSON object must use the schema: {json.dumps(Recipe.model_json_schema(), indent=2)}",
            },
            {
                "role": "user",
                "content": f"Create a recipe using the following ingredients {ingredients_toString}.",
            }
        ],

        model="llama3-8b-8192",
        temperature=0.5,
        max_tokens=1024,
        top_p=1,
        stop=None,
        stream=False,
        response_format= {"type": "json_object"},
    )

    return Recipe.model_validate_json(chat_completion.choices[0].message.content)


def print_recipe(recipe: Recipe):
    print("Recipe:", recipe.recipe_name)

    print("\nIngredients:")
    for ingredient in recipe.ingredients:
        print(
            f"- {ingredient.name}: {ingredient.quantity} {ingredient.quantity_unit or ''}"
        )
    print("\nDirections:")
    for step, direction in enumerate(recipe.directions, start=1):
        print(f"{step}. {direction}")


recipe = generate_recipe_groq([{"name": "chicken"}, {"name": "rice"}, {"name": "broccoli"}])
print_recipe(recipe)
