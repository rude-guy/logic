import { App } from './App';
import loader from '../loader';
import { Page } from './Page';

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
  createPage(opts) {
    const { id, path, bridgeId, query } = opts;
    const staticModule = loader.getModuleByPath(path);
    this.pages[id] = new Page(staticModule, {
      id,
      path,
      bridgeId,
      query,
    });
  }
  pageShow(opts) {
    const { id } = opts;
    const currentPage = this.pages[id];
    currentPage && currentPage.onShow();
  }
  pageHide(opts) {
    const { id } = opts;
    const currentPage = this.pages[id];
    currentPage && currentPage.onHide();
  }
  pageReady(opts) {
    const { id } = opts;
    const currentPage = this.pages[id];
    currentPage && currentPage.onReady();
  }
  pageScroll(opts) {
    const { id, scrollTop } = opts;
    const currentPage = this.pages[id];
    currentPage &&
      currentPage.onPageScroll({
        scrollTop,
      });
  }
}

export default new RuntimeManager();
