import Library from "./library";

export class SystemState {
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

export class System {
  static addMember = (systemState, member) => {
    const previous = systemState.get();
    const next = Library.addMember(previous, member);
    systemState.commit(previous, next);
  };
}
