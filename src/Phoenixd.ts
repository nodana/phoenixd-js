import { EventEmitter } from "events";
import { HttpClient, IHttpClient } from "./HttpClient";
import { WebSocketClient, IWebSocketClient } from "./WebSocketClient";
import type {
  IPhoenxid,
  IPhoenixdOptions,
  ICreateInvoiceParams,
  IPayInvoiceParams,
  ICloseChannelParams,
} from "./types";

const defaultOptions: IPhoenixdOptions = {
  // Connect to the websocket endpoint
  ws: false,
  // Display console logs
  debug: false,
};

export class Phoenixd extends EventEmitter implements IPhoenxid {
  private _options: IPhoenixdOptions;
  private _httpClient: IHttpClient;
  private _webSocketClient: IWebSocketClient | undefined;

  public constructor(
    url: string,
    password: string,
    options?: IPhoenixdOptions
  ) {
    super();

    this._options = { ...defaultOptions, ...options };
    this._httpClient = new HttpClient(url, password);

    if (this._options?.ws === true) {
      this._webSocketClient = new WebSocketClient(url, password);

      this._webSocketClient.on("open", this._onOpen.bind(this));
      this._webSocketClient.on("close", this._onClose.bind(this));
      this._webSocketClient.on("message", this._onMessage.bind(this));
      this._webSocketClient.on("error", this._onError.bind(this));
    }
  }

  public async getInfo() {
    return this._httpClient.get("/getinfo");
  }

  public async getBalance() {
    return this._httpClient.get("/getbalance");
  }

  public async listChannels() {
    return this._httpClient.get("/listchannels");
  }

  public async closeChannel(params: ICloseChannelParams) {
    return this._httpClient.post("/closechannel", params);
  }

  public async createInvoice(params: ICreateInvoiceParams) {
    return this._httpClient.post("/createinvoice", params);
  }

  public async payInvoice(params: IPayInvoiceParams) {
    return this._httpClient.post("/createinvoice", params);
  }

  private _onOpen() {
    this.emit("open");
  }

  private _onClose() {
    this.emit("close");
  }

  private _onMessage(json: any) {
    this.emit("message");
  }

  private _onError(e: any) {
    this.emit("error");
  }
}
