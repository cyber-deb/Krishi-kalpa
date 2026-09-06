import requests
LIBRETRANSLATE_URL = "http://localhost:5000/translate"
def translate_to_bengali(text: str) -> str:
    """
    Translate English text to Bengali using local LibreTranslate.
    """
    if not text:
        return text
    try:
        response = requests.post(
            LIBRETRANSLATE_URL,
            json={
                "q": text,
                "source": "en",
                "target": "bn",
                "format": "text"
            },
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        return data.get("translatedText", text)
    except Exception as e:
        print(f"Translation error: {e}")
        # If translation fails, keep original English text
        return text