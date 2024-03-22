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
}

export default new WinXin();
