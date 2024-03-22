import message from '../message';
import callback from '../callback';

class WinXin {
  constructor() {}

  navigateTo(opts) {
    const { url, onSuccess } = opts;
    const success = callback.saveCallback(onSuccess);
    message.send({
      type: 'triggerWXApi',
      body: {
        apiName: 'navigateTo',
        params: { url, success },
      },
    });
  }
  navigateBack() {
    message.send({
      type: 'triggerWXApi',
      body: {
        apiName: 'navigateBack',
        params: {},
      },
    });
  }

  navigateToMiniProgram(opts) {
    const { appId, path } = opts;
    message.send({
      type: 'triggerWXApi',
      body: {
        apiName: 'navigateToMiniProgram',
        params: {
          appId,
          path,
        },
      },
    });
  }
}

export default new WinXin();
