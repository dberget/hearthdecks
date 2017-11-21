  export function scrubFilter(state) {
      let newObj = [Object.keys(state).forEach((key) =>
          (state[key] == false) && delete state[key]), state][1]

      return newObj;
  }

  export function encodeQueryData(data) {
      var newData = scrubFilter(data)

      let ret = [];
      for (let d in newData)
          ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(newData[d]));
      return ret.join('&');
  }
