from backend.config import GROQ_API_KEY
from groq import Groq
from typing import List, Optional
import json
from pydantic import BaseModel

# Data model for LLM to generate
class Ingredient(BaseModel):
    name: str
    quantity: str

class Recipe(BaseModel):
    recipe_name: str
    ingredients: List[Ingredient]
    directions: List[str]

client = Groq(api_key=GROQ_API_KEY)

def generate_recipe_groq(ingredients) -> Recipe:
    # Convert ingredients list to string for prompt
    ingredients_list = [ingredient['name'] for ingredient in ingredients]
    ingredients_toString = ", ".join(ingredients_list)

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a chef creating new recipes using provided ingredients."
                           f" The JSON object must use the schema: {json.dumps(Recipe.model_json_schema(), indent=2)}",
            },
            {
                "role": "user",
                "content": f"Create a recipe using the following ingredients: {ingredients_toString}.",
            }
        ],
        model="llama3-8b-8192",
        temperature=0.5,
        max_tokens=1024,
        top_p=1,
        stop=None,
        stream=False,
        response_format={"type": "json_object"},
    )

    return Recipe.model_validate_json(chat_completion.choices[0].message.content)

def generate_multiple_recipes(ingredients, num_recipes=5) -> List[Recipe]:
    tasks = [generate_recipe_groq(ingredients) for _ in range(num_recipes)]
    return tasks

def print_recipe(recipe: Recipe):
    print("Recipe:", recipe.recipe_name)
    print("\nIngredients:")
    for ingredient in recipe.ingredients:
        print(
            f"- {ingredient.name}: {ingredient.quantity}"
        )
    print("\nDirections:")
    for step, direction in enumerate(recipe.directions, start=1):
        print(f"{step}. {direction}")


if __name__ == "__main__":
    # Example usage
    ingredients = [{"name": "chicken", "quantity": "1.5 kg"}, {"name": "potato"}]

    recipes = generate_multiple_recipes(ingredients)
    for recipe in recipes:
        print_recipe(recipe)
        print("\n" + "="*40 + "\n")


