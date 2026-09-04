const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    if (!res.ok) {
      console.warn(`API request to ${endpoint} returned status ${res.status}. Using fallback.`);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn(`Backend connection unavailable at ${BASE_URL}${endpoint}. Switching to offline demo engine.`);
    return null;
  }
}
