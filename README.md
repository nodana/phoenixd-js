# Phoenixd Nodejs SDK

This is a simple Nodejs Client that makes it easier for developers to make requests against their Phoenixd node.

It it written using Typescript and offers full type support.

It has been tested against phoenixd version `0.1.5`. When newer versions are released the package will be updated.

## Installation

```bash
npm i @nodana/phoenixd-nodejs
```

## Create a client

```js
import Pxd from @nodana/phoenixd-nodejs;

const client = new Pxd(url, password, {
  ws: true, // connect to websock endpoint (default false)
  debug: true, // show console logs (default false)
});
```

## Methods

### Get Client Info

```js
await client.getInfo();
```

### Get Balance

```js
await client.getBalance();
```

### List Channels

```js
await client.listChannels();
```

### Close Channel

```js
await client.closeChannel(channelId, address, feeRateSatByte);
```

### Create Invoice

```js
await client.createInvoice({
  description,
  descriptionHash,
  amountSat,
  externalId,
});
```

### Pay Invoice

```js
await client.payInvoice({ amountSat, invoice });
```

### Send To Address

```js
await client.sendToAddress({ amountSat, address, feeRateSatByte });
```

### List Incoming Payments

```js
await client.listIncomingPayments({ from, to, limit, offset, all, externalId });
```

### Get Incoming Payment

```js
await client.getIncomingPayment(paymentHash);
```

### List Outgoing Payments

```js
await client.listOutgoingPayments({ from, to, limit, offset, all });
```

### Get Outgoing Payment

```js
await client.getOutgoingPayment(paymentId);
```

## Websockets

This sdk will not automatically connect to the websocket endoint. If you would like it to connect then pass `ws: true` when creating the instance.

### Events

You can listen to the following events: `open`, `close`, `error` and `payment`.

### Open Event

Fired when a connection to your node's websocket endpoint has been established.

### Close Event

Fired when a connection to your node's websocket ends.

### Error Event

Fired when there is an error with the websocket connection.

### Payment Event

Fired when your node receives a payment.

```js
client.on("payment", data, (payment: WebsocketResponse) => {
  const { type, amountSat, paymentHash, externalId } = payment;
  // Handle payment here
});
```
