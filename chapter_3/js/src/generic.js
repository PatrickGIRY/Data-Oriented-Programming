class Generic {
  static get = (data, path) => {
    var res = data;
    if (path) {
      for (var i = 0; res && i < path.length; i++) {
        const key = path[i];
        res = res[key];
      }
      return res;
    } else {
      return undefined;
    }
  };
}

export default Generic;
