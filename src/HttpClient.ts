export interface IHttpClient {
  get(path: string): Promise<any>;
  post(path: string, data: any): Promise<any>;
}

export class HttpClient implements IHttpClient {
  private url: string;
  private password: string;
  private headers: {
    [key: string]: string;
  };

  constructor(url: string, password: string) {
    this.url = url;
    this.password = password;
    this.headers = {};

    this._setHeaders(password);
  }

  private _setHeaders(password: string) {
    this.headers = {
      Authorization: "Basic " + Buffer.from(":" + password).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    };
  }

  private async _call(path: string, method: string, data?: any) {
    try {
      const options: any = {
        method,
        headers: this.headers,
      };

      if (data) {
        options.body = new URLSearchParams(data);
      }

      const response = await fetch(`${this.url}${path}`, options);

      if (!response.ok) {
        // Log error
        return;
      }

      return response.json();
    } catch (e: any) {
      throw e.message;
    }
  }

  public get(path: string) {
    return this._call(path, "GET");
  }

  public post(path: string, data: any) {
    return this._call(path, "POST", data);
  }
}