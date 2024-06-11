# NodeJS Phoenxid Client

This is a simple NodeJS client that makes it easier for developers to connect to their Phoenixd node and make requests. You do **not** need a Nodana hosted node to use this package.

## Installation

```bash
npm install @nodana/phoenixd-js
```

## Create a client

```js
import Phoenixd from @nodana/phoenixd-nodejs;

const client = new Phoenixd(url, password, {
  ws: true, // connect to websock endpoint (default false)
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
client.on("payment", data, (payment: Payment) => {
  // Handle payment here
});
```
