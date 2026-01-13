import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function safeFetch<T>(endpoint: string, payload: any): Promise<T | null> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.status === 429) {
            toast.error("Rate limit exceeded. Please wait a moment.");
            return null;
        }

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();

    } catch (error: any) {
        if (error.name === 'AbortError') {
            toast.error("Request timed out. Backend is slow.");
        } else {
            console.error("API Error:", error);
            // Don't toast here to avoid spamming, handle in component
        }
        return null;
    }
}
