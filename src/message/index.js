import mitt from 'mitt';

class Message {
  constructor() {
    this.event = new mitt();
    this.init();
  }
  init() {
    // 监听原生层发送的消息
    global.addEventListener('message', (e) => {
      const msg = e.data;
      const { type, body } = msg;
      this.event.emit(type, body);
    });
  }
  // 接收原生层发送的消息
  receive(type, handler) {
    this.event.on(type, handler);
  }

  // 向原生层发送消息
  send(msg) {
    global.postMessage(msg);
  }
}

export default new Message();
