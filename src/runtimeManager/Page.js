import { isFunction, cloneDeep } from 'lodash';
import message from '@/message';

const lifeCycleMethods = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPageScroll'];
const loop = () => {};

export class Page {
  constructor(pageModule, extraOption) {
    this.pageModule = pageModule;
    this.extraOption = extraOption;
    this.id = extraOption.id;
    this.data = cloneDeep(pageModule.moduleInfo.data);
    this.initLifeCycle();
    this.initMethods();
    this.onLoad(this.extraOption.query || {});
    this.onShow();
  }

  initLifeCycle() {
    lifeCycleMethods.forEach((name) => {
      if (!isFunction(this.pageModule.moduleInfo[name])) {
        return;
      }
      // 初始化生命周期函数
      this[name] = this.pageModule.moduleInfo[name].bind(this) || loop;
    });
  }

  initMethods() {
    const moduleInfo = this.pageModule.moduleInfo;
    for (let attr in moduleInfo) {
      if (isFunction(moduleInfo[attr]) && !lifeCycleMethods.includes(attr)) {
        // 初始化自定义函数
        this[attr] = this.pageModule.moduleInfo[attr].bind(this);
      }
    }
  }

  setData(data) {
    for (let key in data) {
      this.data[key] = data[key];
    }
    message.send({
      type: 'updateModule',
      body: {
        data: this.data,
        id: this.id,
        bridgeId: this.id,
      },
    });
  }
}
