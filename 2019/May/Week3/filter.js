/**
 * 按条件过滤传入的集合
 *
 * @param {Array|Object} collection 用于查找的集合
 * @param {Function|Object|String} predicate 用于过滤的断言
 * @returns {Array} 返回集合中满足条件的对象组成的数组
 *
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * // 过滤出 active 为 true 的元素
 * filter(users, function(o) { return !o.active; });
 *
 * // 过滤 age 为 36 且 active 为 true 的元素
 * filter(users, { 'age': 36, 'active': true });
 *
 * // 过滤出 active 为 true 的元素
 * filter(users, 'active');
 */
const filterMapping = {
    'function': (obj, func) => func(obj) ? obj : null,
    'string': (obj, name) => obj[name] ? obj : null,
    'object': (obj, map) => Object.keys(map).every(key => obj[key] === map[key]) ? obj : null,
};
module.exports = function filter(collection, predicate) {
    const result = [];

    if (!collection) {
        return result;
    }

    let collectionArray = collection;
    if (!Array.isArray(collection)) {
        collectionArray = Object.values(collection);
    }

    collectionArray.forEach(e => {
        const predicateType = typeof predicate;
        const r = predicateType in filterMapping ?
            filterMapping[predicateType](e, predicate)
            : null;
        if (r) {
            result.push(r);
        }
    });
    return result;
};
