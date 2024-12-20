// 生命周期管理器

class LifeCycleManager {
  constructor() {
    this.hooks = {
      init: [],
      start: [],
      track: [],
      stop: [],
      destroy: [],
    };
  }

  // 注册钩子
  on(hook, callback) {
    if (this.hooks[hook]) {
      this.hooks[hook].push(callback);
    }
  }

  //   触发钩子
  trigger(hook, ...args) {
    if (this.hooks[hook]) {
      this.hooks[hook].forEach((callback) => {
        callback(...args);
      });
    }
  }
}

const lifeCycle = new LifeCycleManager();

export default lifeCycle;
