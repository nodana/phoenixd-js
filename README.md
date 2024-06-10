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
await client.sendToAddress(amountSat, address, feeRateSatByte);
```

### List Incoming Payments

```js
await client.listIncomingPayments(<tbc>);
```

### Get Incoming Payment

```js
await client.getIncomingPayment(<tbc>);
```

### List Outgoing Payments

```js
await client.listOutgoingPayments(<tbc>);
```

### Get Outgoing Payment

```js
await client.getOutgoingPayment(<tbc>);
```

## Websocket Events

In progress...
