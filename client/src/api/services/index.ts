import { User } from "firebase/auth";
import { API_BASE_URL } from "../../config/constants";

export * from "./defs/budget";
export * from "./defs/transaction";
export * from "./defs/filters";
export * from "./defs/income";
export * from "./defs/balances";
export * from "./defs/token";

interface ApiRequest {
  user: User;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
  token?: string;
}

export const apiRequest = async ({
  user,
  endpoint,
  method,
  body,
  token,
}: ApiRequest) => {
  if (!token) {
    token = await user.getIdToken();
  }
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  if (method === "POST" || method === "PUT") {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
    ...(body &&
      (method === "POST" || method === "PUT") && {
        body: JSON.stringify(body),
      }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
