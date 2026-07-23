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

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

// TODO: wire this up to shared/state's session so the auth header is
// attached automatically on every request.
function getAuthHeader(): Record<string, string> {
  return {};
}

export async function apiClient<T>(
  path: string,
  { method = "GET", body, headers = {} }: RequestOptions = {},
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
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
