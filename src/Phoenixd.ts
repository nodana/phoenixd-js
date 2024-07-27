import { EventEmitter } from "events";
import { HttpClient, IHttpClient } from "./HttpClient";
import type {
  PhoenixdClient,
  CreateInvoiceParams,
  PayInvoiceParams,
  PayOfferParams,
  CloseChannelParams,
  PayLnAddressParams,
  SendToAddressParams,
  ListIncomingPaymentsParams,
  ListOutgoingPaymentsParams,
  DecodeInvoiceParams,
  DecodeOfferParams,
  lnUrlPayParams,
  lnUrlWithdrawParams,
  lnUrlAuthParams,
} from "./types";

export class Phoenixd extends EventEmitter implements PhoenixdClient {
  url: string;
  password: string;
  private _httpClient: IHttpClient;

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

  public async payLnAddress(params: PayLnAddressParams) {
    return this._httpClient.post("/paylnaddress", params);
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

  public async lnUrlPay(params: lnUrlPayParams) {
    return this._httpClient.post("/lnurlpay", params);
  }

  public async lnUrlWithdraw(params: lnUrlWithdrawParams) {
    return this._httpClient.post("/lnurlwithdraw", params);
  }

  public async lnUrlAuth(params: lnUrlAuthParams) {
    return this._httpClient.post("/lnurlauth", params);
  }
}
