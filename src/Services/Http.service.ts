import axios from "axios";
import {
  catchError,
  from,
  map,
  Observable,
  throttleTime,
  throwError,
} from "rxjs";
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
  for (let key in Object.keys(query)) {
    result += result ? createPart(key, query) : `&${createPart(key, query)}`;
  }
  return "";
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
    map((data) => {
      if (data.data && data.success) {
        return data.data;
      }
      throw data.error;
    }),
    catchError((_) => throwError(["Failed to make HTTP Request"]))
  );
}

function createResourceEndpoint(
  scheme: string,
  baseUri: string,
  endpoint: string,
  queryString?: string
) {
  return (
    `${scheme}:\\${baseUri}/${endpoint}` +
    (queryString ? `?${queryString}` : "")
  );
}

function createQueryStringPart(key: string, query: any): string {
  return `${key}=${query[key]}`;
}
