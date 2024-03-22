import message from '../message';
import callback from '../callback';
import navigation from '../navigation';

class WinXin {
  constructor() {}

  showToast(opts) {
    const { title, icon, duration } = opts;

    const { bridgeId } = navigation.getCurrentPageInfo();

    message.send({
      type: 'showToast',
      body: {
        bridgeId,
        params: {
          title,
          icon,
          duration,
        },
      },
    });
  }

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
