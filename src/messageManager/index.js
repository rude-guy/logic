import message from '@/message';
import loader from '@/loader';
import runtimeManager from '@/runtimeManager';

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
    this.message.receive('createApp', (msg) => {
      runtimeManager.createApp(msg);
    });
    this.message.receive('appShow', () => {
      runtimeManager.appShow();
    });
    this.message.receive('appHide', () => {
      runtimeManager.appHide();
    });
  }
}

export default new MessageManager();
