# Running the backend

1. Install dependencies

    ```bash
    pip install -r requirements.txt
    ```
2. Install tesseract.exe (not the python package)

    [Tesseract.exe install](https://github.com/UB-Mannheim/tesseract/wiki)

3. Install mongoDB and mongoDB compass 

    [MongoDB Community Server Download](https://www.mongodb.com/try/download/community-kubernetes-operator)
    
    Create database with name: "ingredient_database"
    Create Collections in database: "ingredients" and "recipes"

4. Edit the URI in mongoDB.py

    ```python
    client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB URI
    ```

5. Run Flask Backend

    ```bash
    python -m backend.app
    ```