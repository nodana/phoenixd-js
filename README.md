# NodeJS Phoenxid Client

This is a simple NodeJS client that makes it easier for developers to connect to their Phoenixd node and make requests. You do **not** need a Nodana hosted node to use this package.

## Installation

```bash
npm install @nodana/phoenixd-js
```

## Getting Started

```js
import Phoenixd, { GetInfoResponse } from @nodana/phoenixd-js;

const pxd = new Phoenixd(url, password, {
  ws: true, // connect to websock endpoint (default false)
});

const info: GetInfoResponse = await pxd.getInfo();
```

## Methods

### Get Client Info

```js
getInfo();
```

### Get Balance

```js
getBalance();
```

### List Channels

```js
listChannels();
```

### Close Channel

```js
closeChannel({ channelId, address, feeRateSatByte });
```

### Create Invoice

```js
createInvoice({
  description,
  descriptionHash,
  amountSat,
  externalId,
});
```

### Pay Invoice

```js
payInvoice({ amountSat, invoice });
```

### Send To Address

```js
sendToAddress({ amountSat, address, feeRateSatByte });
```

### List Incoming Payments

```js
listIncomingPayments({ from, to, limit, offset, all, externalId });
```

### Get Incoming Payment

```js
getIncomingPayment(paymentHash);
```

### List Outgoing Payments

```js
listOutgoingPayments({ from, to, limit, offset, all });
```

### Get Outgoing Payment

```js
getOutgoingPayment(paymentId);
```

## Websockets

This sdk will not automatically connect to the websocket endoint. If you would like it to connect then pass `ws: true` when creating the instance.

### Events

You can listen to the following events: `open`, `close`, `error` and `payment`:

```js
pxd.on("<event>", handler);
```

### Open Event

Fired when a connection to your node's websocket endpoint has been established.

### Close Event

Fired when a connection to your node's websocket closes.

### Error Event

Fired when there is an error with the websocket connection.

### Payment Event

Fired when your node receives a payment.

```js
pxd.on("payment", (payment: Payment) => {
  console.log(payment);
});
```

A payment looks like this:

```json
{
  "amountSat": 1000,
  "paymentHash": "8ffcc4bf33a2e0db2f4e884784483ea105391238e4edf874531803ec41ab4518",
  "externalId": "1234567890"
}
```
