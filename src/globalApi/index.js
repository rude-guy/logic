import loader from '@/loader';
import wx from '@/wx';
import { require, define } from './amd';

class GlobalApi {
  constructor() {}

  init() {
    global.modRequire = require;
    global.modDefine = define;
    global.wx = wx;
    global.App = (moduleInfo) => {
      loader.createAppModule(moduleInfo);
    };
    global.Page = (moduleInfo, compileInfo) => {
      loader.createPageModule(moduleInfo, compileInfo);
    };
  }
}

export default new GlobalApi();
