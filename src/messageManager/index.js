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
      const { bridgeId } = msg;
      runtimeManager.createApp(msg);
      message.send({
        type: 'appIsCreated',
        body: {
          bridgeId,
        },
      });
    });
    this.message.receive('appShow', () => {
      runtimeManager.appShow();
    });
    this.message.receive('appHide', () => {
      runtimeManager.appHide();
    });
    this.message.receive('markPageInitialData', (msg) => {
      const { bridgeId, pagePath } = msg;
      const initialData = loader.getInitialDataByPagePath(pagePath);
      message.send({
        type: 'initialDataIsReady',
        body: {
          bridgeId,
          initialData,
        },
      });
    });
  }
}

export default new MessageManager();
