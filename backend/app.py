from .TextRec.ocr_component import OCR

# Load Test Image
img_path = "backend/images/flat_test.jpg"
text = OCR(img_path)

print(text)