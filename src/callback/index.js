import { uuid } from '@/utils/util';
class Callback {
  constructor() {
    this.callback = new Map();
  }

  saveCallback(callback) {
    const id = uuid();
    this.callback.set(id, callback);
    return id;
  }

  triggerCallback(id, args) {
    const callback = this.callback.get(id);
    if (callback) {
      callback(...args);
      this.callback.delete(id);
    }
  }
}

export default new Callback();
