import message from '@/message';

class Loader {
  constructor() {
    this.staticModules = new Map();
  }

  loadResources(opts) {
    const { appId, bridgeId } = opts;
    const logicResourcePath = `http://127.0.0.1:3077/mini_resource/${appId}/logic.js`;

    importScripts(logicResourcePath);
    message.send({
      type: 'logicResourceLoaded',
      body: {
        appId,
        bridgeId,
      },
    });
  }
}

export default new Loader();
