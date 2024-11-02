import pytesseract
import cv2
import numpy as np
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def OCR(img_path):
    # Load Test Image
    img = cv2.imread(img_path)

    # Resize Image to 300 DPI
    img = resize_image_to_dpi(img, 300)

    cropped_img = crop_image(img)

    gray = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian Blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (3, 3), 0)

    # Threshold
    _, binary_img = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # OCR
    text = pytesseract.image_to_string(binary_img)

    return text

def resize_image_to_dpi(cv_img, target_dpi=300):
    rgb_image = cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB)
    
    # Convert the NumPy array to a PIL Image
    pil_image = Image.fromarray(rgb_image)
    
    # Get the current size of the image in pixels
    width, height = pil_image.size
    
    # Assume original DPI is 72 if not specified
    dpi = pil_image.info.get('dpi', (72, 72))
    width_dpi, height_dpi = dpi
    scaling_factor_width = target_dpi / width_dpi
    scaling_factor_height = target_dpi / height_dpi
    
    # Calculate the new dimensions
    new_width = int(width * scaling_factor_width)
    new_height = int(height * scaling_factor_height)
    
    # Resize the image
    resized_pil_image = pil_image.resize((new_width, new_height), Image.LANCZOS)
    
    # Convert back to OpenCV format (BGR)
    resized_cv_image = cv2.cvtColor(np.array(resized_pil_image), cv2.COLOR_RGB2BGR)
    
    return resized_cv_image  # Return the resized CV image

def crop_image(img):

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian Blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Edge Detection
    edges = cv2.Canny(blurred, 50, 150)

    # Find contours
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Crop Left and Right
    leftmost_x = img.shape[1]  # Start with the rightmost possible x
    rightmost_x = 0  # Start with the leftmost possible x

    # Find uppermost and lowermost y-coordinates
    uppermost_y = img.shape[0]
    lowermost_y = 0

    # Loop through each contour to find extreme points
    for contour in contours:
        for point in contour:
            x, y = point[0]
            if x < leftmost_x:
                leftmost_x = x
            if x > rightmost_x:
                rightmost_x = x
            if y < uppermost_y:
                uppermost_y = y
            if y > lowermost_y:
                lowermost_y = y

    # Crop out by extreme points
    cropped_image = img[uppermost_y:lowermost_y, leftmost_x:rightmost_x]
    return cropped_image