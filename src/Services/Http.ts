import axios, { AxiosResponse } from "axios";
import { Message } from "../Shared/Misc/Message";
import { Unit } from "../Shared/Type";
import { Settings } from "./Settings";

export const Http = {
  async get<T>(endpoint: string, query?: any): Promise<HttpResult<T>> {
    return baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.get(finalEndpoint)
    );
  },
  async post<T>(endpoint: string, payload: any, query?: any): Promise<HttpResult<T>> {
    return await baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.post(finalEndpoint, payload)
    );
  },

  async put<T>(endpoint: string, payload: any, query?: any): Promise<HttpResult<T>> {
    return await baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.put(finalEndpoint, payload)
    );
  },
  delete(endpoint: string): Promise<Unit> {
    return baseHttpCall(endpoint, {}, (finalEndpoint) =>
      axios.delete(finalEndpoint)
    );
  },
  async patch(endpoint: string, payload: any): Promise<Unit> {
    return baseHttpCall(endpoint, {}, (finalEndpoint) =>
      axios.patch(finalEndpoint, payload)
    );
  }
};

function createQueryString(
  query: any,
  createPart: (key: string, query: any) => string
): string {
  let result = "";
  let keys = Object.keys(query);

  if (keys.length === 0) {
    return result;
  }

  for (let i = 0; i < keys.length; i++) {
    result += isEmptyQueryString(result)
      ? createPart(keys[i], query)
      : `&${createPart(keys[i], query)}`;
  }

  return result;
}

function isEmptyQueryString(queryString: string): boolean {
  return !(queryString && queryString.length);
}

async function baseHttpCall<T>(
  endpoint: string,
  query: any,
  action: (endpoint: string) => Promise<AxiosResponse<T>>
): Promise<HttpResult<T>> {
  let queryString = query
    ? createQueryString(query, createQueryStringPart)
    : "";

  let resourceEndpoint = createResourceEndpoint(
    Settings.ServerScheme,
    Settings.ServerUri,
    endpoint,
    queryString
  );

  var response = await action(resourceEndpoint);

  return {
    data: response.data,
    success: isSuccessStatusCode(response.status)
  };
}

function createResourceEndpoint(
  scheme: string,
  baseUri: string,
  endpoint: string,
  queryString?: string
) {
  return (
    `${scheme}://${baseUri}/${endpoint}` +
    (queryString ? `?${queryString}` : "")
  );
}

function createQueryStringPart(key: string, query: any): string {
  return `${key}=${query[key]}`;
}

function isSuccessStatusCode(statusCode: number): boolean {
  return statusCode >= 200 && statusCode <= 299;
}

export type HttpResult<T> = {
  data: T | Unit,
  success: boolean
};