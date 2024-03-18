import { isFunction } from 'lodash';

const lifeCycleMethods = ['onLaunch', 'onShow', 'onHide'];

const loop = () => {};

export class App {
  constructor(moduleInfo, openInfo) {
    this.moduleInfo = moduleInfo;
    this.openInfo = openInfo;
    this.init();
  }
  init() {
    this.initLifeCycle();
    this.callLifeCycle();
  }

  initLifeCycle() {
    lifeCycleMethods.forEach((name) => {
      if (!isFunction(this.moduleInfo[name])) {
      }
      // 初始化生命周期函数
      this[name] = this.moduleInfo[name].bind(this) || loop;
    });
  }

  callLifeCycle() {
    const { scene, pagePath, query } = this.openInfo;
    const options = {
      scene,
      query,
      path: pagePath,
    };
    this.onLaunch(options);
    this.onShow(options);
  }

  callShowLifeCycle() {
    const { scene, pagePath, query } = this.openInfo;
    const options = {
      scene,
      query,
      path: pagePath,
    };
    this.onShow(options);
  }
}
