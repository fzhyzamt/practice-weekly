/**
 * 按指定键合并多个集合
 *
 * @param {String|Array<String>|Function} keys 指定的键
 * @param {Array|Object} collection 用于合并的基础集合
 * @param {Array|Object} restCollection 用于合并的其他集合
 * @returns {Array} 返回合并后的集合
 *
 * @example
 *
 * const col1 = [
 *   { 'dim1': 'barney', 'met1': 123 },
 *   { 'dim1': 'fred', 'met1': 456 }
 * ];
 *
 * const col2 = [
 *   { 'dim1': 'barney', 'met2': 111 },
 *   { 'dim1': 'fred', 'met2': 222 }
 * ];
 *
 * const col3 = [
 *  { 'dim1': 'barney', 'met3': 113 },
 *  { 'dim1': 'fred', 'met3': 223 }
 * ];
 *
 * // 按 dim1 合并
 * mergeCollection('dim1', col1, col2, col3);
 *
 * // 按 [dim1] 合并
 * mergeCollection(['dim1'], col1, col2, col3);
 *
 * // 按 (o) => o.dim1 合并
 * mergeCollection((o) => o.dim1, col1, col2, col3);
 */
const mergeCheckMapping = {
    'string': (key, baseCollection, otherCollection) => baseCollection[key] === otherCollection[key],
    'object': (keyArray, baseCollection, otherCollection) => keyArray.every(key => baseCollection[key] === otherCollection[key]),
    'function': (func, baseCollection, otherCollection) => func(baseCollection) === func(otherCollection)
};
function merge(baseCollection, otherCollection) {
    Object.keys(otherCollection).forEach(key => {
        // eslint-disable-next-line no-param-reassign
        baseCollection[key] = otherCollection[key];
    })
}
module.exports = function mergeCollection(keys, baseCollection, ...restCollection) {
    const keyType = typeof keys;
    if (!restCollection || !(keyType in mergeCheckMapping)) {
        return baseCollection;
    }
    let baseCollectionArray = baseCollection;
    if (!Array.isArray(baseCollection)) {
        baseCollectionArray = Object.values(baseCollection);
    }

    restCollection.forEach(rest => {
        let restArray = rest;
        if (!Array.isArray(rest)) {
            restArray = Object.values(rest);
        }
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < restArray.length; i++) {
            const base = baseCollectionArray[Math.min(baseCollectionArray.length - 1, i)];
            if (mergeCheckMapping[keyType](keys, base, restArray[i])) {
                merge(base, restArray[i]);
            }
        }
    });

    return baseCollectionArray;
