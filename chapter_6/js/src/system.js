import Library from "./library";
class System {
  static addMember = (systemState, member) => {
    const previous = systemState.get();
    const next = Library.addMember(previous, member);
    systemState.commit(previous, next);
  };
}

export default System;
