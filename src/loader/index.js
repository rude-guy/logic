import message from '@/message';
import { AppModule } from './appModule';
import { PageModule } from './PageModule';

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

  getModuleByPath(path) {
    return this.staticModules.get(path);
  }

  createAppModule(moduleInfo) {
    const appModule = new AppModule(moduleInfo);
    this.staticModules.set('app', appModule);
  }

  createPageModule(moduleInfo, compileInfo) {
    const pageModule = new PageModule(moduleInfo, compileInfo);
    const { path } = compileInfo;
    this.staticModules.set(path, pageModule);
  }

  getInitialDataByPagePath(path) {
    const pageModule = this.staticModules.get(path);
    return {
      [path]: pageModule.getInitialData(),
    };
  }
}

export default new Loader();
