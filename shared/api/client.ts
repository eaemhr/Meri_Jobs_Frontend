import { SignupPayload, LoginPayload, AuthResponse, User, ChangePasswordPayload } from './types';

const BASE_URL = 'http://localhost:8080/api/v1';

// 1. Register
export async function signupUser(payload: SignupPayload): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to create account!');
  }
  const data = await res.json();
  
  // ቶከኖቹን ለያይቶ ማስቀመጥ
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
}
// // THE CONTRACT — the only place that talks to api-gateway over HTTP.
// // No feature folder should call fetch()/axios directly; import this instead.

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

// type RequestOptions = {
//   method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
//   body?: unknown;
//   headers?: Record<string, string>;
// };

// // TODO: wire this up to shared/state's session so the auth header is
// // attached automatically on every request.
// function getAuthHeader(): Record<string, string> {
//   return {};
// }

// export async function apiClient<T>(
//   path: string,
//   { method = "GET", body, headers = {} }: RequestOptions = {}
// ): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...getAuthHeader(),
//       ...headers,
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   if (!res.ok) {
//     throw new Error(`API error ${res.status}: ${res.statusText}`);
//   }

//   return res.json() as Promise<T>;
// }
// THE CONTRACT — the only place that talks to api-gateway over HTTP.

// const BASE_URL =
//   process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

// type RequestOptions = {
//   method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
//   body?: unknown;
//   headers?: Record<string, string>;
// };

// // TODO: wire this up to shared/state's session so the auth header is
// // attached automatically on every request.
// function getAuthHeader(): Record<string, string> {
//   return {};
// }

// export async function apiClient<T>(
//   path: string,
//   { method = "GET", body, headers = {} }: RequestOptions = {},
// ): Promise<T> {
//   const isFormData = body instanceof FormData;

//   const res = await fetch(`${BASE_URL}${path}`, {
//     method,
//     headers: {
//       ...(!isFormData && { "Content-Type": "application/json" }),
//       ...getAuthHeader(),
//       ...headers,
//     },
//     body: isFormData ? body : body ? JSON.stringify(body) : undefined,
//   });

//   if (!res.ok) {
//     throw new Error(`API error ${res.status}: ${res.statusText}`);
//   }

//   return res.json() as Promise<T>;
// }

// shared/api/client.ts
// THE CONTRACT — the only place that talks to api-gateway over HTTP.

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  /** Set true for binary responses (e.g. GET /cv/{id}/export → PDF). */
  responseType?: "json" | "blob";
};

// 2. Login
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || 'Failed to login');
  }
  const data = await res.json();
  
  // ቶከኖቹን ለያይቶ ማስቀመጥ
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
}

// 3. Refresh Token (አዲስ access token ለማግኘት የሚጠቅም)
export async function refreshToken(refreshTokenStr: string): Promise<{ access: string; refresh: string }> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshTokenStr }),
  });
  if (!res.ok) {
    throw new Error('Failed to refresh token');
  }
  const data = await res.json();
  
  // አዲሶቹን ቶከኖች ማሻሻል
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  return data;
}

// 4. Update Profile Detail (ለ Onboarding)
export async function updateProfileDetail(profileData: Partial<User>): Promise<User> {
  const res = await fetch(`${BASE_URL}/auth/profile/detail`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
/** Matches cv-parser-api.yaml's Error schema: { error, detail } */
export class ApiError extends Error {
  status: number;
  detail?: string;

  constructor(status: number, message: string, detail?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

async function buildApiError(res: Response): Promise<ApiError> {
  let message = `API error ${res.status}: ${res.statusText}`;
  let detail: string | undefined;
  try {
    const body = await res.json();
    message = body.error ?? message;
    detail = body.detail;
  } catch {
    // Response wasn't JSON (or was empty) — fall back to the generic message.
  }
  return new ApiError(res.status, message, detail);
}

export async function apiClient<T>(
  path: string,
  {
    method = "GET",
    body,
    headers = {},
    responseType = "json",
  }: RequestOptions = {},
): Promise<T> {
  const isFormData = body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...getAuthHeader(),
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error('Failed to update profile');
  }
  const data = await res.json();
  return data.user || data;
}
    throw await buildApiError(res);
  }

  if (responseType === "blob") {
    return res.blob() as unknown as Promise<T>;
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

/**
 * Multipart upload with real progress reporting, for the one case fetch()
 * can't do well: reporting upload-progress percentage as bytes go out.
 * Still the "one door" to the backend — just the XHR-based one, kept here
 * in shared/api/ rather than in a feature folder, per Rule #2.
 */
export function apiUpload<T>(
  path: string,
  formData: FormData,
  onProgress?: (percent: number) => void,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${BASE_URL}${path}`);

    const authHeaders = getAuthHeader();
    Object.entries(authHeaders).forEach(([key, value]) =>
      xhr.setRequestHeader(key, value),
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(
            xhr.responseText ? JSON.parse(xhr.responseText) : (undefined as T),
          );
        } catch {
          reject(new ApiError(xhr.status, "Response was not valid JSON"));
        }
        return;
      }
      let message = `API error ${xhr.status}`;
      let detail: string | undefined;
      try {
        const body = JSON.parse(xhr.responseText);
        message = body.error ?? message;
        detail = body.detail;
      } catch {
        // non-JSON error body
      }
      reject(new ApiError(xhr.status, message, detail));
    };

    xhr.onerror = () =>
      reject(
        new ApiError(0, "Network error — check your connection and try again."),
      );

    xhr.send(formData);
  });
}
