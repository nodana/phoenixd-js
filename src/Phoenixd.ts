import { EventEmitter } from "events";
import { HttpClient, IHttpClient } from "./HttpClient";
import { WebSocketClient, IWebSocketClient } from "./WebSocketClient";
import type {
  PhoenixdClient,
  CreateInvoiceParams,
  PayInvoiceParams,
  CreateOfferParams,
  PayOfferParams,
  CloseChannelParams,
  SendToAddressParams,
  ListIncomingPaymentsParams,
  ListOutgoingPaymentsParams,
  DecodeInvoiceParams,
  DecodeOfferParams,
} from "./types";

export class Phoenixd extends EventEmitter implements PhoenixdClient {
  private url: string;
  private password: string;
  private _httpClient: IHttpClient;
  private _webSocketClient: IWebSocketClient | undefined;

  public constructor(url: string, password: string) {
    super();

    this.url = url;
    this.password = password;
    this._httpClient = new HttpClient(url, password);
  }

  public async createInvoice(params: CreateInvoiceParams) {
    if (!params.description && !params.descriptionHash) {
      console.info(
        "Either 'description' or 'descriptionHash' must be provided"
      );
      return;
    }

    return this._httpClient.post("/createinvoice", params);
  }

  public async payInvoice(params: PayInvoiceParams) {
    return this._httpClient.post("/payinvoice", params);
  }

  public async createOffer() {
    return this._httpClient.post("/createoffer", {});
  }

  public async payOffer(params: PayOfferParams) {
    return this._httpClient.post("/payoffer", params);
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

  public async decodeInvoice(params: DecodeInvoiceParams) {
    return this._httpClient.post("/decodeinvoice", params);
  }

  public async decodeOffer(params: DecodeOfferParams) {
    return this._httpClient.post("/decodeoffer", params);
  }

  public connect() {
    this._webSocketClient = new WebSocketClient(this.url, this.password);

    this._webSocketClient.on("open", this._onOpen.bind(this));
    this._webSocketClient.on("close", this._onClose.bind(this));
    this._webSocketClient.on("message", this._onMessage.bind(this));
    this._webSocketClient.on("error", this._onError.bind(this));
  }

  public disconnect() {
    this._webSocketClient?.disconnect();
  }

  private _onOpen() {
    this.emit("open");
  }

  private _onClose() {
    this.emit("close");
  }

  private _onMessage(message: MessageEvent) {
    this.emit("message", message);
  }

  private _onError(e: any) {
    this.emit("error", { error: e.message });
  }
}
