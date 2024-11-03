# 🍳 Overcook'd 🍳 #

Our app Overcook'd is an app that helps users create healthy and delicious recipes based on their available ingredients. We include integration that leverages AI to scan and read reciepts for automatic ingredient recognition and recipe generation. 

## Introduction
As college students we feel that we often find it difficult to find easy recipes that fit our budget and the ingredients that we have readily available. Inevitably we create dishes which turn out far from what we expected, and end up wasting large amounts of time and resources. To fight this issue we came up with the idea of Overcook'd in order to reduce the amount of waste we create, while simultaneously making the process of preparing meals simpler and more enjoyable.

This tailors towards college students, to busy parents, or even anyone who enjoys exploring new foods while being more efficient with our resources and allowing us to reduce the amount of food which is wasted every year. In joining our mission we can help reduce our species footprint on the planet, while having the enjoyment of exploring new and exciting recipes every single day!

## Tools and Technologies
* Front End: React Native and Expo 
* Back End: Flask and Python
* Database: MongoDB
* AI Tools: Pytesseract and Llama 3
* Hosting: GROQ
* Design: Figma

## Design Overview
* Ingredient Page: Has integration for manual entry and also reciept scanning. Uses MongoDB to remain persistant through app relaunches.
* Recipe Generation Page: A page that allows the user to generate a list of recipes and filter through them. Each recipe has the option to be permanently saved until manually deleted.
* Saved Recipes: Has a list of persistant recipes, which have been saved by the user and will remain saved until deleted.

## Usage
* Install Expo on [Ios](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&pli=1)
* run npm install i to retrieve all dependencies
* run npm start
* scan the QR code in the terminal
