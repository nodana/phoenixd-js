# Phoenxid NodeJS Client

Whether you're hosting your Phoenixd node on [Nodana](https://nodana.io) or hosting it somewhere else, this package makes it easier for you to make requests against your node and connect to the websocket endpoint.

## Installation

```bash
npm install @nodana/phoenixd-js
```

## Getting Started

```js
import Phoenixd, { GetInfoResponse } from @nodana/phoenixd-js;

const pxd = new Phoenixd(connectionUrl, password);
...

// Called within an async function
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

To connect to the websocket endpoint you need to call the `connect` method:

```js
pxd.connect();
```

You can also disconnect the websocket connection using:

```js
pxd.disconnect();
```

### Events

You can listen to the following events: `open`, `close`, `message` and `error`:

```js
pxd.on("<event>", handler);
```

You will then be able to add listeners for the following events;

### Open Event

Fired when a connection to your node's websocket endpoint has been established.

### Close Event

Fired when a connection to your node's websocket closes.

### Error Event

Fired when there is an error with the websocket connection.

### Message Event

Fired when a message event is received.

```js
pxd.on("message", (message: MessageEvent) => {
  const data = message.toString();
  const json = JSON.parse(data);

  console.log(json);

  // {
  // "type": "payment_received",
  // "amountSat": 100,
  // "paymentHash": "f419207c9edde9021ebfb6bd0df6bd0a6606ecaf935357cc2f362e30835c3765",
  // "externalId": "foobar"
  // }
});
```
