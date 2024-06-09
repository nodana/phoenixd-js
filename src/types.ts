export interface IGetInfoResponse {
  nodeId: string;
  channels: IChannel[];
}

export interface IGetBalanceResponse {
  balanceSat: number;
  feeCreditSat: number;
}

export interface ICreateInvoiceParams {
  description: string;
  descriptionHash: string;
  amountSat: number;
  externalId: string;
}

export interface IPxdClient {
  on(event: string, listener: Function): this;
  getInfo(): Promise<IGetInfoResponse>;
  getBalance(): Promise<IGetBalanceResponse>;
  listChannels(): Promise<any>;
  closeChannel({
    channelId,
    address,
    feerateSatByte,
  }: {
    channelId: string;
    address: string;
    feerateSatByte: number;
  }): Promise<any>;
}

export interface IPxdOptions {
  ws?: boolean;
  debug?: boolean;
}

export interface IChannel {
  state: string;
  channelId: string;
  balanceSat: number;
  inboundLiquiditySat: number;
  capacitySat: number;
  fundingTxId: string;
}
