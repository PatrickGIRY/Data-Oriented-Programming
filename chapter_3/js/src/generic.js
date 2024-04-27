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

  static map = (data, mapper) => {
    var result = [];
    if (data) {
      if (data instanceof Array) {
        result = mapper ? data.map(mapper) : data;
      } else if (data instanceof Object) {
        result = Object.keys(data).map((key) =>
          mapper ? undefined : data[key]
        );
      }
    }
    return result;
  };
}

export default Generic;
