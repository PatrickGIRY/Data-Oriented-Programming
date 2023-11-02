import { expect, test, describe } from "vitest";
import UserManagement from "./user-management";

describe("UserManagemeent.addMember", () => {
  const member = {
    email: "jessie@gmail.com",
    password: "my-secret",
  };
  test("add member to an empty user management state", () => {
    const userManagementStateBefore = {};

    const expectedUserManagementStateAfter = {
      memberByEmail: {
        "jessie@gmail.com": {
          email: "jessie@gmail.com",
          password: "my-secret",
        },
      },
    };

    const result = UserManagement.addMember(userManagementStateBefore, member);

    expect(result).toEqual(expectedUserManagementStateAfter);
  });

  test("add member with user management with an existing member", () => {
    const userManagementStateBefore = {
      memberByEmail: {
        "franck@gmail.com": {
          email: "franck@gmail.com",
          password: "my-top-secret",
        },
      },
    };

    const expectedUserManagementStateAfter = {
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
    };

    const result = UserManagement.addMember(userManagementStateBefore, member);

    expect(result).toEqual(expectedUserManagementStateAfter);
  });

  test("add member already exists in user mamgement state", () => {
    const userManagementStateBefore = {
      memberByEmail: {
        "jessie@gmail.com": {
          email: "jessie@gmail.com",
          password: "my-secret",
        },
      },
    };

    expect(() =>
      UserManagement.addMember(userManagementStateBefore, member)
    ).toThrowError(/^Member already exists.$/);
  });
});
