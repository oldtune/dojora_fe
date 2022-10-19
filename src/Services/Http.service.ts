import axios from "axios";
import { catchError, tap, from, map, Observable } from "rxjs";
import { Message } from "../Shared/Misc/Message";
import { BaseResponseModel } from "../Shared/Models/BaseResponseModel";
import { SettingService } from "./Settings.service";

export const HttpService = {
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
  },
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
    SettingService.ServerScheme,
    SettingService.ServerUri,
    endpoint,
    queryString
  );

  return from(action(resourceEndpoint)).pipe(
    map((data) => unwrapAxiosResponse<T>(data)),
    map((data) => {
      if (data.error) {
        throw data.error;
      }
      if (data.validationResult) {
        throw data.validationResult;
      }
      return data.data as T;
    }),
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

function unwrapAxiosResponse<T>(response: any): BaseResponseModel<T> {
  if (response.code && response.code === "ERR_NETWORK") {
    return {
      error: ["Network error"],
      success: false,
      validationResult: [],
      data: {} as T,
    };
  }
  if (
    response.status &&
    !isSuccessStatusCode(Number.parseInt(response.status))
  ) {
    return response.data;
  }

  return response.data;
}

function isSuccessStatusCode(statusCode: number): boolean {
  return statusCode >= 200 && statusCode <= 299;
}
