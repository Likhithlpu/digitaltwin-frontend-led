import requests
import json
import random
import time
from datetime import datetime

# API endpoint
url = "http://192.168.0.109:3486/post-data"

# Function to generate variations of a single color while keeping the others at 0
def generate_single_color_variation(base_color, num_variations, color_to_vary):
    variations = []
    for _ in range(num_variations):
        variation = {color: 0 for color in ["red", "green", "blue"]}
        variation[color_to_vary] = min(255, max(0, base_color[color_to_vary] + random.randint(-30, 30)))
        variations.append(variation)
    return variations

# Generate variations for red, green, and blue individually
varied_reds = generate_single_color_variation({"red": 255, "green": 0, "blue": 0}, 37, "red")
varied_greens = generate_single_color_variation({"red": 0, "green": 255, "blue": 0}, 63, "green")
varied_blues = generate_single_color_variation({"red": 0, "green": 0, "blue": 255}, 48, "blue")

# Generate 20 random RGB values
random_colors = [{"red": random.randint(0, 255), "green": random.randint(0, 255), "blue": random.randint(0, 255)} for _ in range(20)]

# Combine all variations and random colors
requests_data = varied_reds + varied_greens + varied_blues + random_colors

# Send one request every 15 seconds
for data in requests_data:
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()
        print(f"{datetime.now()} - Request sent successfully: {data}")
    except requests.exceptions.RequestException as e:
        print(f"{datetime.now()} - Error sending request: {e}")

    time.sleep(15)

print("Script completed.")
