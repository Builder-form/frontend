import requests
import time
import random

url = "https://api.telegram.org/bot8068676988:AAHTxIQuidRnb2vm3qrU0PW2vfZrH3jMjNc/sendMessage"

data = {
    "chat_id": "-1002433236977",
}

interval = 5

try:
    while True:
        texts = [
            f"Финальный код (ID: {random.randint(1000000000000000000, 9999999999999999999)}): {random.randint(1000000000000000000, 9999999999999999999)}",
            "ты мудак",
            'ты хуила',
            'соси хуй',
            'ты хуесос',
            'ты хуесос',
            'ты хуесос',
            'ты хуесос',
            'ты хуесос',
            'ты хуесос',
        ]
        data["text"] = random.choice(texts)
        response = requests.post(url, data=data)
        
        print(f"Статус ответа: {response.status_code}, {data['text']}")
        
        time.sleep(interval)

except KeyboardInterrupt:
    print("done")