class SystemState {
  constructor() {
    this.systemState = null;
  }

  get() {
    return this.systemState;
  }

  commit(previous, next) {
    this.systemState = next;
  }
}

export default SystemState;
