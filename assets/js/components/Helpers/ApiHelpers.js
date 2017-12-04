export function scrubFilters(state) {
    const newObj = [Object.keys(state).forEach(key =>
        (state[key] == false) && delete state[key]), state][1]

    return newObj
}

export function encodeQueryData(newData) {
    const ret = []

    for (let d in newData)
        if (newData.hasOwnProperty(d)) {
            ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(newData[d])}`)
        }

    return ret.join('&')
}

