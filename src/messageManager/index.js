import message from '@/message';

class MessageManager {
  constructor() {
    this.message = message;
  }

  init() {
    this.message.receive('test', (msg) => {
      console.log('逻辑线程接收到 test消息', msg);
    });

    setTimeout(() => {
      this.message.send({
        type: 'test',
        body: {
          data: 'hello world',
        },
      });
    }, 1000);
  }
}

export default new MessageManager();
