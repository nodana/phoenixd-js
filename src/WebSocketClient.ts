import WebSocket from "ws";
import { EventEmitter } from "events";

export interface IWebSocketClient {
  on(event: string, listener: Function): this;
}

export class WebSocketClient extends EventEmitter {
  socket: WebSocket;

  constructor(url: string, password: string) {
    super();

    this.socket = new WebSocket(this._getWebsocketEndpoint(url), {
      headers: {
        Authorization:
          "Basic " + Buffer.from(":" + password).toString("base64"),
      },
    });

    this.socket.on("open", this._onOpen.bind(this));
    this.socket.on("close", this._onClose.bind(this));
    this.socket.on("message", this._onMessage.bind(this));
    this.socket.on("error", this._onError.bind(this));
  }

  private _getWebsocketEndpoint(url: string) {
    return `${url}/websocket`;
  }

  private _onOpen() {
    this.emit("open");
  }

  private _onClose() {
    this.emit("close");
  }

  private _onMessage(message: MessageEvent) {
    try {
      const data = message.toString();
      const json = JSON.parse(data);

      this.emit(json);
    } catch (e: any) {
      this._onError(e);
    }
  }

  private _onError(e: Error) {
    this.emit("error", { message: e.message });
  }
}
