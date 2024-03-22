class Navigation {
  constructor() {
    this.stack = [];
  }

  pushStack(pageInfo) {
    const { bridgeId, query, pagePage } = pageInfo;
    this.stack.push({
      bridgeId,
      query,
      pagePage,
    });
  }

  popStack() {
    this.stack.pop();
  }

  getCurrentPageInfo() {
    return this.stack[this.stack.length - 1] || null;
  }
}

export default new Navigation();
