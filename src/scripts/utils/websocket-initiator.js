const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log('data dari server testing websocket', message.data);
    console.log('parsing data response', JSON.parse(message.data));
  },
};
export default WebSocketInitiator;
