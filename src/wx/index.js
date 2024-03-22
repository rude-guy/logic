import message from '../message';

class WinXin {
  constructor() {}

  navigateTo(opts) {
    const { url } = opts;
    message.send({
      type: 'triggerWXApi',
      body: {
        apiName: 'navigateTo',
        params: { url },
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
}

export default new WinXin();
