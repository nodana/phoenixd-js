# Phoenxid NodeJS Client

Whether you're hosting your Phoenixd node on [Nodana](https://nodana.io) or self-hosting, this package makes it easier for you to make requests against your node as well as connect to the websocket endpoint and listen for events.

## Installation

```bash
npm install @nodana/phoenixd-js
```

## Getting Started

```js
import Phoenixd, { GetInfoResponse } from @nodana/phoenixd-js;

const pxd = new Phoenixd(connectionUrl, password);

// async
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

## Websocket

To connect to the websocket endpoint you need to call the `connect` method:

```js
pxd.connect();
```

You can also disconnect the websocket connection using:

```js
pxd.disconnect();
```

### Events

You can listen to the following events: `open`, `close`, `message` and `error` by using the `on` method:

```js
pxd.on("<event>", handler);
```

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

## Contributing

Contributions to this project are welcomed:

1. Fork repo
2. Create feature branch
3. Create PR

I will review as soon as possible.
