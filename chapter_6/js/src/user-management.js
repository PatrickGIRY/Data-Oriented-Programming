import _ from "lodash";

class UserManagement {
  static addMember = (userManagement, member) => {
    const email = _.get(member, "email");
    const infoPath = ["memberByEmail", email];
    if (_.has(userManagement, infoPath)) {
      throw "Member already exists.";
    }
    return _.set(userManagement, infoPath, member);
  };
}

export default UserManagement;
