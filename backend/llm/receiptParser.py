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
    quantity: Optional[str]

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
        if ingredient.quantity:
            print(f"{ingredient.name}: {ingredient.quantity}")
        else:
            print(ingredient.name)
        
if __name__ == "__main__":
    receipt_scanned = '''
    t Packarrds Corner © 617-991-9822
    Boston Parte SOMMONWEALTH AVE

    860 COM
    Boston Massachusetts 02215-1205

    40/26/2024 11:40 AM

    vUIALAALAUARD A ARTE

    HEALTH AND BEAUTY
    094030295 ABREVA T + $24.49
    SUBTOTAL $24.49
    T = MA TAX 6.25000 on $24.49 $1.53
    TOTAL $26.02
    «3222 VISA CHARGE $26.02
    AID: 0000000031010
    VISA CREDIT
    AUTH CODE: 01145C

    WHEN YOU RETURN ANY ITEM, YOUR
    RETURN CREDIT WILL NOT INCLUDE ANY
    PROMOTIGNAL DISCGUNT OR COUPON
    APPLIED [0 THE ORIGINAL ORDER.

    SAVING WITH ARGET CIRCLE GOT EASIERt
    Open the Target App or visit
    target.con/circle to seo your savings
    and tind more benefits!

    + INDICATES HEALTH ITEM
    HEALTH ITEM TOTAL: 26.02

    RECH2~-43300-3226-0172-0282-9

    ee
    ewe weer er eee

    Beef 1 lb 
    Broc 2 sb

    Help make your Terget Run better
    Take a 2 minute survey about today's trip

    informtarget .com
    User Ii): 7569 9677 4982
    Password: 797 171

    CUENTENOS EN ESPANOL

    Please take this survey within 7 days'''

    ingredients = parse_receipt(receipt_scanned)
    print_ingredients(ingredients)