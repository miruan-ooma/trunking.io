/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../environments/environment";
import { EMPTY, Observable, catchError, map, of, switchMap, throwError } from "rxjs";
import {
  IncompleteTrunkingAPIAction,
  InvalidTrunkingAPIRequest,
  TrunkingAPIError,
  TrunkingApiResponse
} from "./context.model";
import { SnackbarService } from "../app/shared/components/snackbar.service";

interface MakeRequestOptions {
  method?: "GET" | "POST" | "DELETE";
  isShowSnackBar?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class ApiService {
  snackbarService = inject(SnackbarService);
  readonly ApiUrl = environment.production
    ? "https://api.onsip.com/api"
    : "https://beta.jnctn.com/api";
  readonly VERSION_NUMBER = "0.0.1";
  constructor(private http: HttpClient) {}

  makeRequest<T = any>(actionName: string, body: any = {}, options?: MakeRequestOptions) {
    const headerDict = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const params = { ...body };
    params.Action = actionName;
    params.Output = "json";
    params.AppUserAgent = "Trunking_io/" + this.VERSION_NUMBER + "/web";
    const query = this.querystringify(params);
    let request$: Observable<T> = EMPTY;

    if (!options || options?.method === "GET") {
      request$ = this.http.get<T>(this.ApiUrl, requestOptions);
    } else if (options?.method === "POST") {
      request$ = this.http.post<T>(this.ApiUrl, query, requestOptions);
    }

    return request$.pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 200) {
          this.snackbarService.openSnackBar(err.message, "error");
        }
        return throwError(() => err);
      }),
      map(res => (res as any).Response as T),
      switchMap(res => this.handleError(res as TrunkingApiResponse, !!options?.isShowSnackBar))
    );
  }

  private handleError(res: TrunkingApiResponse, isShowSnackBar: boolean) {
    if (res.Context.Action.IsCompleted === "true") {
      return of(res);
    }
    return throwError(() => {
      const err = this.getError(res) as TrunkingAPIError;
      if (isShowSnackBar) {
        this.snackbarService.openSnackBar(err.Message, "error");
      }
      return err;
    });
  }

  private getError(res: TrunkingApiResponse) {
    return (
      (res.Context.Action as IncompleteTrunkingAPIAction)?.Errors?.Error ||
      (res.Context.Request as InvalidTrunkingAPIRequest)?.Errors?.Error
    );
  }

  private querystringify(obj: any): string {
    const mangledObj = Object.create(null);

    Object.keys(obj).forEach(key => {
      const value = obj[key];

      if (!Array.isArray(value)) {
        mangledObj[key] = value;
      } else {
        value.forEach((val, i) => {
          const mangledKey = key + "[" + i + "]";
          const mangledValue = val;
          mangledObj[mangledKey] = mangledValue;
        });
      }
    });

    return this.querystringEncode(mangledObj);
  }

  private stringifyPrimitive(v: string | boolean | number): string {
    switch (typeof v) {
      case "string":
        return v;

      case "boolean":
        return v ? "true" : "false";

      case "number":
        return isFinite(v) ? v.toString() : "";

      default:
        return "";
    }
  }

  private querystringEncode(obj: any, separator?: string, equals?: string, name?: string): string {
    separator = separator || "&";
    equals = equals || "=";
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === "object") {
      return Object.keys(obj)
        .map(key => {
          const keyString = encodeURIComponent(this.stringifyPrimitive(key)) + equals;
          if (Array.isArray(obj[key])) {
            return obj[key]
              .map((v: string) => keyString + encodeURIComponent(this.stringifyPrimitive(v)))
              .join(separator);
          } else {
            return keyString + encodeURIComponent(this.stringifyPrimitive(obj[key]));
          }
        })
        .join(separator);
    } else if (!name) {
      return "";
    } else {
      return (
        encodeURIComponent(this.stringifyPrimitive(name)) +
        equals +
        encodeURIComponent(this.stringifyPrimitive(obj))
      );
    }
  }
}
