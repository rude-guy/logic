import message from '@/message';
import loader from '@/loader';

class MessageManager {
  constructor() {
    this.message = message;
  }

  init() {
    this.message.receive('loadResource', (msg) => {
      const { appId, bridgeId } = msg;
      loader.loadResources({
        appId,
        bridgeId,
      });
    });
  }
}

export default new MessageManager();
