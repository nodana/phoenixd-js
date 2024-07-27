**Works with phoenixd 0.3.1**

# Phoenxid NodeJS Client

Javascript client for phoenixd nodes written using Typescript with full type support. Works in any Javascript environment including NodeJS and React Native.

## Installation

```bash
npm install @nodana/phoenixd-js
```

## Getting Started

```js
import { Phoenixd, NodeInfo } from @nodana/phoenixd-js;

const pxd = new Phoenixd(connectionUrl, password);

// async
const info: NodeInfo = await pxd.getInfo();
```

## Methods

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

### Create Offer

```js
createOffer();
```

### Pay Offer

```js
payOffer({ amountSat, offer, message });
```

### Pay Lightning Address

```js
payLnAddress({ amountSat, address, message });
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

### Decode Invoice

```js
decodeInvoice({ invoice });
```

### Decode Offer

```js
decodeOffer({ offer });
```

### LN-URL Pay

```js
lnUrlPay({ amountSat, lnurl, message });
```

### LN-URL Withdraw

```js
lnUrlWithdraw({ lnurl });
```

### LN-URL Auth

```js
lnUrlAuth({ lnurl });
```

See https://phoenix.acinq.co/server/api for full API details.

## Contributing

Contributions to this project are welcomed:

1. Fork repo
2. Create feature branch
3. Create PR

I will review as soon as possible.
