import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  readonly ApiUrl = environment.production
    ? "https://api.onsip.com/api"
    : "https://beta.jnctn.com/api";
  readonly VERSION_NUMBER = "3.29.6";
  constructor(private http: HttpClient) {}

  makeRequest(actionName: string, body: any = {}) {
    console.log(environment);

    const headerDict = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const params = { ...body };
    params.Action = actionName;
    params.Output = "json";
    params.AppUserAgent = "OnSIP_App/" + this.VERSION_NUMBER + "/web";
    const query = this.querystringify(params);
    let request$ = null;
    return (request$ = this.http.post(this.ApiUrl, query, requestOptions));
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
