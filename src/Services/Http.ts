import axios from "axios";
import { catchError, from, map, Observable } from "rxjs";
import { Message } from "../Shared/Misc/Message";
import { BaseResponseModel } from "../Shared/Models/BaseResponseModel";
import { Settings } from "./Settings";

export const Http = {
  get<T>(endpoint: string, query?: any): Observable<T> {
    return baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.get(finalEndpoint)
    );
  },
  post<T>(endpoint: string, payload: any, query?: any): Observable<T> {
    return baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.post(finalEndpoint, payload)
    );
  },

  put<T>(endpoint: string, payload: any, query?: any): Observable<T> {
    return baseHttpCall(endpoint, query, (finalEndpoint) =>
      axios.put(finalEndpoint, payload)
    );
  },
  delete<T>(endpoint: string): Observable<T> {
    return baseHttpCall(endpoint, {}, (finalEndpoint) =>
      axios.delete(finalEndpoint)
    );
  },
  patch<T>(endpoint: string, payload: any): Observable<BaseResponseModel<T>> {
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

function baseHttpCall<T>(
  endpoint: string,
  query: any,
  action: (endpoint: string) => Promise<BaseResponseModel<T>>
): Observable<T> {
  let queryString = query
    ? createQueryString(query, createQueryStringPart)
    : "";

  let resourceEndpoint = createResourceEndpoint(
    Settings.ServerScheme,
    Settings.ServerUri,
    endpoint,
    queryString
  );

  return from(action(resourceEndpoint)).pipe(
    map((data) => unwrapAxiosResponse<T>(data)),
    catchError((err) => {
      Message.error("Oh no, something went wrong!");
      throw err;
    })
  );
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

function unwrapAxiosResponse<T>(response: any): T {
  if (response.code === "ERR_NETWORK" || !isSuccessStatusCode(Number.parseInt(response.status))) {
    return {} as T;
  }

  return response.data;
}

function isSuccessStatusCode(statusCode: number): boolean {
  return statusCode >= 200 && statusCode <= 299;
}
