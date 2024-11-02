'''
The receipt scanner returns a list where each elemnt is a string of what it read from that line of the receipt.
Use llm to parse out what the ingredients are and their quantities. And do not add that line to the list of ingredients if it is not an ingredient or is unreadable.
'''

from backend.config import GROQ_API_KEY
from groq import Groq
from typing import List, Optional
import json
from pydantic import BaseModel

class Ingredient(BaseModel):
    name: str
    quantity: Optional[float]
    quantity_unit: Optional[str]

class IngredientList(BaseModel):
    list: List[Ingredient]

client = Groq(api_key=GROQ_API_KEY)

def parse_receipt(receipt_scanned):

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are required to read the receipt scanned by a program and might not be completely accurate. Extract the ingredients and their quantities from the receipt."
                            f" The JSON object must use the schema: {json.dumps(IngredientList.model_json_schema(), indent=2)}",
            },
            {
                "role": "user",
                "content": f"Extract the ingredients and their quantities from the following receipt: {receipt_scanned}."
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

    return IngredientList.model_validate_json(chat_completion.choices[0].message.content)

def print_ingredients(ingredients: IngredientList):

    for ingredient in ingredients.list:

        # only print ingredient quantity and unit if they exist
        if ingredient.quantity and ingredient.quantity_unit:
            print(f"{ingredient.name}: {ingredient.quantity} {ingredient.quantity_unit}")
        else:
            print(ingredient.name)
        
if __name__ == "__main__":
    receipt_scanned = '''DATE 06/01/2016

    eeerrreererersrrervsrrrerrrrrrrr rrr yry

    LUCHINNI GREEN
    0.778kq NET @ $5.99/kg
    BANANA CAVENDISH
    0.442kq NET @ $2.99/kg
    SPECTAL
    SPECIAL
    POTATOES BRUSHED
    1.328kgq NET @ $2.99/kg
    BROCCOLI
    0.808kq NET @ $5.99/kg
    BRUSSEL SPROUTS
    0.322kqg NET @ $15.99/kq
    SPECIAL
    GRAPES GREEN
    1.174kg NET @ $5.99/kg
    PEAS SNOW
    0.218kq NET @ $14.99/kq
    TOMATOES GRAPE
    LETTUCE ICEBERG
    SUBTOTAL
    LOYALTY
    SUBTOTAL
    SUBTOTAL

    SUBTOTAL
    TOTAL
    CASH
    CHANGE

    $4.66
    $1.32

    $0.99
    $1.50
    $3.97

    $4.84
    $5.15

    $0.99
    $7.03

    $3.27

    $2.99
    $2.49
    $39.20
    -15.00
    $24.20
    $24.20
    
    LUCHINNI GREEN
    0.778kq NET @ $5.99/kg'''

    ingredients = parse_receipt(receipt_scanned)
    print_ingredients(ingredients)