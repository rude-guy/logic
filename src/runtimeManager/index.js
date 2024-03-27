import { App } from './App';
import { Page } from './Page';
import loader from '@/loader';
import navigation from '../navigation';
import callback from '../callback';

class RuntimeManager {
  constructor() {
    this.app = null;
    this.pages = {};
  }
  createApp(opts) {
    const { scene, pagePath, query } = opts;
    const appModule = loader.staticModules.get('app');
    if (this.app) {
      return;
    }
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
    navigation.pushStack({
      bridgeId,
      query,
      pagePath: path,
    });
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
  pageUnload(opts) {
    const { id } = opts;
    const currentPage = this.pages[id];
    currentPage && currentPage.onUnload();
  }
  triggerEvent(opts) {
    const { id, methodName, event } = opts;
    const currentPage = this.pages[id];
    currentPage[methodName] && currentPage[methodName](event);
  }
  triggerCallback(opts) {
    const { callbackId, args } = opts;
    callback.triggerCallback(callbackId, args);
  }
}

export default new RuntimeManager();
