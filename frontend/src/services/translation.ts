const LIBRETRANSLATE_URL = "http://localhost:5000/translate";

const cache = new Map<string, string>();

export async function translateToBengali(text: string): Promise<string> {
  if (!text || !text.trim()) return text;

  if (cache.has(text)) {
    return cache.get(text)!;
  }

  try {
    const response = await fetch(LIBRETRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "bn",
        format: "text",
      }),
    });

    if (!response.ok) {
      return text;
    }

    const data = await response.json();

    const translated = data.translatedText || text;

    cache.set(text, translated);

    return translated;
  } catch (error) {
    console.error("Translation failed:", error);
    return text;
  }
}