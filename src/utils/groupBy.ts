export function groupBy<T, K>(array: Array<T>, callbackFn: (value: T) => K) {
  return array.reduce<Map<K, Array<T>>>((map, nextValue) => {
    const key = callbackFn(nextValue)
    if (map.has(key)) {
      map.set(key, [...map.get(key)!, nextValue])
    } else {
      map.set(key, [nextValue])
    }
    return map
  }, new Map())
}
