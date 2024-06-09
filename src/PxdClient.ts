import { EventEmitter } from "events";
import { HttpClient, IHttpClient } from "./HttpClient";
import { WebSocketClient, IWebSocketClient } from "./WebSocketClient";
import type { IPxdClient, IPxdOptions, ICreateInvoiceParams } from "./types";

const defaultOptions: IPxdOptions = {
  // Connect to the websocket endpoint
  ws: false,
  // Display console logs
  debug: false,
};

export class PxdClient extends EventEmitter implements IPxdClient {
  // Pxd library options
  private _options: IPxdOptions;
  // Http client
  private _httpClient: IHttpClient;
  // WebSocket client
  private _webSocketClient: IWebSocketClient | undefined;

  /**
   * Initializes a new Pxd instance
   *
   * @param url: string - Url for your phoenixd node
   * @param password: string - Http password for your phoenixd node
   * @param options?: IPxdOptions - Optionally specify Pxd options
   */
  public constructor(url: string, password: string, options?: IPxdOptions) {
    super();

    this._options = { ...defaultOptions, ...options };
    this._httpClient = new HttpClient(url, password);

    if (!!options?.ws) {
      this._webSocketClient = new WebSocketClient(url, password);

      this._webSocketClient.on("open", this._onOpen.bind(this));
      this._webSocketClient.on("close", this._onClose.bind(this));
      this._webSocketClient.on("message", this._onMessage.bind(this));
      this._webSocketClient.on("error", this._onError.bind(this));
    }
  }

  /**
   * Get node info
   */
  public async getInfo() {
    return this._httpClient.get("/getinfo");
  }

  /**
   * Get balance of node
   */
  public async getBalance() {
    return this._httpClient.get("/getbalance");
  }

  /**
   * List channels for node
   */
  public async listChannels() {
    return this._httpClient.get("/listchannels");
  }

  /**
   * Close a channel
   *
   * @param channelId: string - identifier of the channel to close
   * @param address: string - bitcoin address where your balance will be sent to
   * @param context: number - fee rate in satoshi per vbyte
   */
  public async closeChannel({
    channelId,
    address,
    feerateSatByte,
  }: {
    channelId: string;
    address: string;
    feerateSatByte: number;
  }) {
    return this._httpClient.post("/closechannel", {
      channelId,
      address,
      feerateSatByte,
    });
  }

  /**
   * Create invoice
   *
   * @param description: string - the description of the invoice (max. 128 characters)
   * @param descriptionhash: string - sha256 hash of a description
   * @param address: string - bitcoin address where your balance will be sent to
   * @param context: number - fee rate in satoshi per vbyte
   */
  public async createInvoice(data: ICreateInvoiceParams) {
    return this._httpClient.post("/createinvoice", data);
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
