  export function scrubFilters(state) {
      let newObj = [Object.keys(state).forEach((key) =>
          (state[key] == false) && delete state[key]), state][1]

      return newObj;
  }

  export function encodeQueryData(newData) {
      let ret = [];
      for (let d in newData)
          ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(newData[d]));
      return ret.join('&');
  }
