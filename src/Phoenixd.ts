import { EventEmitter } from "events";
import { HttpClient, IHttpClient } from "./HttpClient";
import { WebSocketClient, IWebSocketClient } from "./WebSocketClient";
import type {
  Phoenxid as PhoenxidType,
  PhoenixdOptions as PhoenixdOptionsType,
  CreateInvoiceParams,
  PayInvoiceParams,
  CloseChannelParams,
  SendToAddressParams,
  ListIncomingPaymentsParams,
  ListOutgoingPaymentsParams,
} from "./types";

const defaultOptions: PhoenixdOptionsType = {
  ws: false,
};

export class Phoenixd extends EventEmitter implements PhoenxidType {
  private _options: PhoenixdOptionsType;
  private _httpClient: IHttpClient;
  private _webSocketClient: IWebSocketClient | undefined;

  public constructor(
    url: string,
    password: string,
    options?: PhoenixdOptionsType
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

  public async createInvoice(params: CreateInvoiceParams) {
    return this._httpClient.post("/createinvoice", params);
  }

  public async payInvoice(params: PayInvoiceParams) {
    return this._httpClient.post("/payinvoice", params);
  }

  public async sendToAddress(params: SendToAddressParams) {
    return this._httpClient.post("/sendtoaddress", params);
  }

  public async listIncomingPayments(params?: ListIncomingPaymentsParams) {
    let path = "/payments/incoming";

    if (params) {
      // @ts-ignore
      const qs = new URLSearchParams(params).toString();
      path += `?${qs}`;
    }

    return this._httpClient.get(path);
  }

  public async getIncomingPayment(paymentHash: string) {
    return this._httpClient.get(`/payments/incoming/${paymentHash}`);
  }

  public async listOutgoingPayments(params?: ListOutgoingPaymentsParams) {
    let path = "/payments/outgoing";

    if (params) {
      // @ts-ignore
      const qs = new URLSearchParams(params).toString();
      path += `?${qs}`;
    }

    return this._httpClient.get(path);
  }

  public async getOutgoingPayment(paymentId: string) {
    return this._httpClient.get(`/payments/outgoing/${paymentId}`);
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

  public async closeChannel(params: CloseChannelParams) {
    return this._httpClient.post("/sendtoaddress", params);
  }

  private _onOpen() {
    this.emit("open");
  }

  private _onClose() {
    this.emit("close");
  }

  private _onMessage(message: MessageEvent) {
    const data = message.toString();
    const json = JSON.parse(data);

    if (json.type === "payment_received") {
      this.emit("payment", {
        amountSat: json.amountSat,
        paymentHash: json.paymentHash,
        externalId: json.externalId,
      });
    }
  }

  private _onError(e: any) {
    this.emit("error");
  }
}
