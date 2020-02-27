function objArrEq(a, b) {
    if (!a || !b) return false
    if (a.length !== b.length ) return false
    return a.some((element, i) => Object.is(element, b[i]))
}

export { objArrEq }