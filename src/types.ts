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

export interface GetInfoResponse {
  nodeId: string;
  channels: ChannelCompact[];
}

export interface GetBalanceResponse {
  balanceSat: number;
  feeCreditSat: number;
}

export type ListChannelsResponse = Channel[];

export interface Phoenxid {
  on(event: string, listener: Function): this;
  getInfo(): Promise<GetInfoResponse>;
  getBalance(): Promise<GetBalanceResponse>;
  listChannels(): Promise<ListChannelsResponse>;
  closeChannel({
    channelId,
    address,
    feeRateSatByte,
  }: CloseChannelParams): Promise<string>;
}

export interface PhoenixdOptions {
  ws?: boolean;
}

export type Payment = {
  type: string;
  amountSat: number;
  paymentHash: string;
  externalId: string;
};
