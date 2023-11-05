import { expect, test, describe } from "vitest";
import { SystemState, System } from "./system";

describe("System.addMember", () => {
  test("add member change system state", () => {
    const jessie = {
      email: "jessie@gmail.com",
      password: "my-secret",
    };

    const libraryStateBefore = {
      userManagement: {
        memberByEmail: {
          "franck@gmail.com": {
            email: "franck@gmail.com",
            password: "my-top-secret",
          },
        },
      },
    };
    const expectedLibraryStateAfter = {
      userManagement: {
        memberByEmail: {
          "jessie@gmail.com": {
            email: "jessie@gmail.com",
            password: "my-secret",
          },
          "franck@gmail.com": {
            email: "franck@gmail.com",
            password: "my-top-secret",
          },
        },
      },
    };
    const systemState = new SystemState();
    systemState.commit(null, libraryStateBefore);
    System.addMember(systemState, jessie);
    expect(systemState.get()).toEqual(expectedLibraryStateAfter);
  });
});
