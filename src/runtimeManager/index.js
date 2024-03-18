import { App } from './App';
import loader from '../loader';

class RuntimeManager {
  constructor() {
    this.app = null;
    this.pages = {};
  }
  createApp(opts) {
    const { scene, pagePath, query } = opts;
    const appModule = loader.staticModules.get('app');
    this.app = new App(appModule.moduleInfo, {
      scene,
      pagePath,
      query,
    });
  }
  appShow() {
    this.app.callShowLifeCycle();
  }
  appHide() {
    this.app.onHide();
  }
}

export default new RuntimeManager();
