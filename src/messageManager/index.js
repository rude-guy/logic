import message from '@/message';
import loader from '@/loader';
import runtimeManager from '@/runtimeManager';

class MessageManager {
  constructor() {
    this.message = message;
  }

  init() {
    this.message.receive('loadResource', (msg) => {
      const { appId, bridgeId, pages } = msg;
      loader.loadResources({
        appId,
        bridgeId,
        pages,
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
    this.message.receive('createInstance', (msg) => {
      runtimeManager.createPage(msg);
    });
    this.message.receive('pageShow', (msg) => {
      const { bridgeId } = msg;
      runtimeManager.pageShow({
        id: bridgeId,
      });
    });
    this.message.receive('pageHide', (msg) => {
      const { bridgeId } = msg;
      runtimeManager.pageHide({
        id: bridgeId,
      });
    });
    this.message.receive('moduleMounted', (msg) => {
      runtimeManager.pageReady(msg);
    });
    this.message.receive('pageScroll', (msg) => {
      runtimeManager.pageScroll(msg);
    });
    this.message.receive('triggerEvent', (msg) => {
      runtimeManager.triggerEvent(msg);
    });
    this.message.receive('pageUnload', (msg) => {
      const { bridgeId } = msg;
      runtimeManager.pageUnload({
        id: bridgeId,
      });
    });
    this.message.receive('triggerCallback', (msg) => {
      runtimeManager.triggerCallback(msg);
    });
  }
}

export default new MessageManager();
