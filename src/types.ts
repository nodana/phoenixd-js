export interface LocalParams {
  nodeId: string;
  fundingKeyPath: string;
  dustLimit: number;
  maxHtlcValueInFlightMsat: number;
  htlcMinimum: number;
  toSelfDelay: number;
  maxAcceptedHtlcs: number;
  isInitiator: boolean;
}

export interface RemoteParams {
  nodeId: string;
  dustLimit: number;
  maxHtlcValueInFlightMsat: number;
  htlcMinimum: number;
}

export interface Commitments {
  params: {
    channelId: string;
    channelConfig: string[];
    channelFeatures: string[];
    localParams: LocalParams;
    remoteParams: RemoteParams;
    channelFlags: number;
  };
}

export interface ChannelUpdate {
  signature: string;
  chainHash: string;
  shortChannelId: string;
  timestampSeconds: number;
  messageFlags: number;
  channelFlags: number;
  cltvExpiryDelta: number;
  htlcMinimumMsat: number;
  feeBaseMsat: number;
  feeProportionalMillionths: number;
  htlcMaximumMsat: number;
}

export interface ChannelCompact {
  state: string;
  channelId: string;
  balanceSat: number;
  inboundLiquiditySat: number;
  capacitySat: number;
  fundingTxId: string;
}

export interface Channel {
  type: string;
  commitments: Commitments;
  shortChannelId: string;
  channelUpdate: ChannelUpdate;
}

export interface CloseChannelParams {
  /** identifier of the channel to close */
  channelId: string;
  /** bitcoin address where your balance will be sent to */
  address: string;
  /** fee rate in satoshi per vbyte */
  feeRateSatByte: number;
}

export interface CreateInvoiceParams {
  /** the description of the invoice (max. 128 characters) */
  description?: string;
  /** sha256 hash of a description */
  descriptionHash?: string;
  /** the amount requested by the invoice, in satoshi. */
  amountSat: number;
  /** an optional custom identifier. Use that to link the invoice to an external system. */
  externalId?: string;
}

export interface PayInvoiceParams {
  /** BOLT11 invoice */
  invoice: string;
  /**  optional amount in satoshi. If unset, will pay the amount requested in the invoice */
  amountSat?: number;
}

export interface CreateOfferParams {}

export interface PayOfferParams {
  /** BOLT12 offer */
  offer: string;
  /** optional amount in satoshi. If unset, will pay the amount requested in the invoice */
  amountSat?: number;
  /** optional message */
  message?: string;
}

export interface PayLnAddressParams {
  /** ln-url lightning address */
  address: string;
  /** amount in satoshi. If unset, will pay the amount requested in the invoice */
  amountSat?: number;
  /** feerate in satoshi per vbyte */
  message?: string;
}

export interface SendToAddressParams {
  /** amount in satoshi */
  amountSat: number;
  /** Bitcoin address where funds will be sent */
  address: string;
  /** feerate in satoshi per vbyte */
  feeRateSatByte: number;
}

export interface ListIncomingPaymentsParams {
  /** start timestamp in millis from epoch, default 0 */
  from?: Date;
  /** end timestamp in millis from epoch, default now */
  to?: Date;
  /** number of payments in the page, default 20 */
  limit?: number;
  /** page offset, default 0 */
  offset?: number;
  /** also return unpaid invoices */
  all?: boolean;
  /** only include payments that use this external id */
  externalId?: string;
}

export interface ListOutgoingPaymentsParams {
  /** start timestamp in millis from epoch, default 0 */
  from?: Date;
  /** end timestamp in millis from epoch, default now */
  to?: Date;
  /** number of payments in the page, default 20 */
  limit?: number;
  /** page offset, default 0 */
  offset?: number;
  /** also return unpaid invoices */
  all?: boolean;
}

export interface DecodeInvoiceParams {
  /** BOLT11 invoice */
  invoice: string;
}

export interface DecodeOfferParams {
  /** BOLT12 offer */
  offer: string;
}

export interface CreateInvoiceResponse {
  amountSat: number;
  paymentHash: string;
  serialized: string;
}

export interface Payment {
  recipientAmountSat: number;
  routingFeeSat: number;
  paymentId: string;
  paymentHash: string;
  paymentPreimage: string;
}

export interface NodeInfo {
  nodeId: string;
  channels: ChannelCompact[];
}

export interface Balance {
  balanceSat: number;
  feeCreditSat: number;
}

export type ListChannelsResponse = Channel[];

export interface IncomingPayment {
  paymentHash: string;
  preimage: string;
  externalId: string;
  description: string;
  invoice: string;
  isPaid: boolean;
  receivedSat: number;
  fees: number;
  completedAt: Date | null;
  createdAt: Date;
}

export interface OutgoingPayment {
  paymentId: string;
  paymentHash: string;
  preimage: string;
  isPaid: boolean;
  sent: number;
  fees: number;
  invoice: string;
  completedAt: Date | null;
  createdAt: Date;
}

/* Websocket payload for payment */
export interface WebsocketPayment {
  type: string;
  amountSat: number;
  paymentHash: string;
  externalId: string;
}

export interface PhoenixdClient {
  createInvoice(params: CreateInvoiceParams): Promise<CreateInvoiceResponse>;
  payInvoice(params: PayInvoiceParams): Promise<Payment>;
  createOffer(): Promise<string>;
  payOffer(params: PayOfferParams): Promise<Payment>;
  payLnAddress(params: PayLnAddressParams): Promise<Payment>;
  sendToAddress(params: SendToAddressParams): Promise<string>;
  listIncomingPayments(
    params?: ListIncomingPaymentsParams
  ): Promise<IncomingPayment[]>;
  getIncomingPayment(paymentHash: string): Promise<IncomingPayment>;
  listOutgoingPayments(
    params?: ListOutgoingPaymentsParams
  ): Promise<OutgoingPayment[]>;
  getOutgoingPayment(paymentId: string): Promise<OutgoingPayment>;
  getInfo(): Promise<NodeInfo>;
  getBalance(): Promise<Balance>;
  listChannels(): Promise<ListChannelsResponse>;
  closeChannel(params: CloseChannelParams): Promise<string>;
  decodeInvoice(params: DecodeInvoiceParams): Promise<any>;
  decodeOffer(params: DecodeOfferParams): Promise<any>;
  /** connect to websocket endpoint */
  connect(): void;
  /** disconnect from websocket endpoint */
  disconnect(): void;
  on(event: "open" | "close" | "message" | "error", listener: Function): this;
}
