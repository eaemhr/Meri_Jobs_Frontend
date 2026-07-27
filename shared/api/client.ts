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

// TODO: wire this up to shared/state's session so the auth header is
// attached automatically on every request.
function getAuthHeader(): Record<string, string> {
  return {};
}

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
