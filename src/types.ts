export interface ILocalParams {
  nodeId: string;
  fundingKeyPath: string;
  dustLimit: number;
  maxHtlcValueInFlightMsat: number;
  htlcMinimum: number;
  toSelfDelay: number;
  maxAcceptedHtlcs: number;
  isInitiator: boolean;
}

export interface IRemoteParams {
  nodeId: string;
  dustLimit: number;
  maxHtlcValueInFlightMsat: number;
  htlcMinimum: number;
}

export interface ICommitments {
  params: {
    channelId: string;
    channelConfig: string[];
    channelFeatures: string[];
    localParams: ILocalParams;
    remoteParams: IRemoteParams;
    channelFlags: number;
  };
}

export interface IChannelUpdate {
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

export interface IChannelCompact {
  state: string;
  channelId: string;
  balanceSat: number;
  inboundLiquiditySat: number;
  capacitySat: number;
  fundingTxId: string;
}

export interface IChannel {
  type: string;
  commitments: ICommitments;
  shortChannelId: string;
  channelUpdate: IChannelUpdate;
}

export interface ICloseChannelParams {
  /** identifier of the channel to close */
  channelId: string;
  /** bitcoin address where your balance will be sent to */
  address: string;
  /** fee rate in satoshi per vbyte */
  feeRateSatByte: number;
}

export interface ICreateInvoiceParams {
  /** the description of the invoice (max. 128 characters) */
  description?: string;
  /** sha256 hash of a description */
  descriptionHash?: string;
  /** the amount requested by the invoice, in satoshi. */
  amountSat: number;
  /** an optional custom identifier. Use that to link the invoice to an external system. */
  externalId?: string;
}

export interface IPayInvoiceParams {
  /** BOLT11 invoice */
  invoice: string;
  /**  optional amount in satoshi. If unset, will pay the amount requested in the invoice */
  amountSat?: number;
}

export interface ISendToAddressParams {
  /** amount in satoshi */
  amountSat: number;
  /** Bitcoin address where funds will be sent */
  address: string;
  /** feerate in satoshi per vbyte */
  feeRateSatByte: number;
}

export interface IListIncomingPaymentsParams {
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

export interface IListOutgoingPaymentsParams {
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

export interface IGetInfoResponse {
  nodeId: string;
  channels: IChannelCompact[];
}

export interface IGetBalanceResponse {
  balanceSat: number;
  feeCreditSat: number;
}

export type IListChannelsResponse = IChannel[];

export interface Phoenxid {
  on(event: string, listener: Function): this;
  getInfo(): Promise<IGetInfoResponse>;
  getBalance(): Promise<IGetBalanceResponse>;
  listChannels(): Promise<IListChannelsResponse>;
  closeChannel({
    channelId,
    address,
    feeRateSatByte,
  }: ICloseChannelParams): Promise<string>;
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
