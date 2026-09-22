import { createClient } from "@/lib/supabase/client";

/**
 * apiFetch wraps the standard fetch API and automatically injects:
 *   Authorization: Bearer <supabase_jwt_access_token>
 * This allows the Go backend API to verify the JWT and extract the user's ID/organization.
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null; status: number }> {
  try {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const headers = new Headers(options.headers || {});
    headers.set("Content-Type", "application/json");

    // Attach the Supabase JWT token if user is signed in
    if (session?.access_token) {
      headers.set("Authorization", `Bearer ${session.access_token}`);
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const status = response.status;
    let data: T | null = null;
    let error: string | null = null;

    try {
      data = await response.json();
    } catch {
      // Body may be empty or non-JSON
    }

    if (!response.ok) {
      error =
        (data as any)?.error ||
        (data as any)?.message ||
        `Request failed with status ${status}`;
    }

    return { data, error, status };
  } catch (err: any) {
    return {
      data: null,
      error: err?.message || "Network request failed",
      status: 500,
    };
  }
}
