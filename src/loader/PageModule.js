export class PageModule {
  constructor(moduleInfo, compileInfo) {
    this.type = 'page';
    this.moduleInfo = moduleInfo;
    this.compileInfo = compileInfo;
  }
  getInitialData() {
    return this.moduleInfo.data || {};
  }
}
