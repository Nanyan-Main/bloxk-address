import { ApiResponse } from "./api";
import { HTTP_METHODS } from "./constant";

export const fetcher = async <T>(
  method: string = HTTP_METHODS.GET,
  path: string,
  body: any = null
) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = new URL(path, API_URL).toString(); // Construct the full URL

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();
  return data as ApiResponse<T>;
};
