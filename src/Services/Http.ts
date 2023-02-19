import axios, { AxiosResponse } from "axios";
import { dbg } from "../Shared/Debug/Debug";
import { getRawFromLocalStorage } from "../Shared/Misc/LocalStorage";
import { Unit } from "../Shared/Type";
import { Settings } from "./Settings";


const configs = () => {
  const tokenResult = getRawFromLocalStorage("TOKEN");
  return {
    headers: {
      Authorization: tokenResult.success ? "Bearer " + tokenResult.data : ""
    }
  }
};

export const Http = {
  async get<T>(endpoint: string, query?: any): Promise<HttpResult<T>> {
    return baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.get(finalEndpoint, configs())
    );
  },
  async post<T>(endpoint: string, payload: any, query?: any): Promise<HttpResult<T>> {
    // console.log('get from storage', token);
    return await baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.post(finalEndpoint, payload, configs())
    )
  },

  async put<T>(endpoint: string, payload: any, query?: any): Promise<HttpResult<T>> {
    return await baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.put(finalEndpoint, payload, configs())
    );
  },
  delete(endpoint: string): Promise<Unit> {
    return baseHttpCall(endpoint, {}, (finalEndpoint) =>
      axios.delete(finalEndpoint, configs())
    );
  },
  async patch(endpoint: string, payload: any): Promise<Unit> {
    return baseHttpCall(endpoint, {}, (finalEndpoint) =>
      axios.patch(finalEndpoint, payload, configs())
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
  var response: any = await action(resourceEndpoint).catch(err => { dbg(err) });
  dbg(response);
  return {
    data: response?.data ? response.data : {},
    //fall back to -1 because response is undefined here
    success: isSuccessStatusCode(response?.status ?? -1)
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