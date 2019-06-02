/**
 * 平面结构转树结构
 * @param   {array}     flattenArr 平面数组
 * @param   {string}    id 数组元素索引名称
 * @param   {string}    pid 数组父元素索引名称
 * @param   {string}    level 数组元素层级名称
 * @param   {string}    children 树结构子节点名称
 *
 * @example
 * 平面结构:
 * [
 *   {id: 1, pid: 0, name: 'a', level: 1},
 *   {id: 2, pid: 0, name: 'b', level: 1},
 *   {id: 3, pid: 1, name: 'aa', level: 2},
 *   {id: 4, pid: 1, name: 'ab', level: 2}
 * ]
 * 树结构:
 * [
 *   {
 *     id: 1,
 *     pid: 0,
 *     name: 'a',
 *     level: 1,
 *     children: [
 *       {id: 3, pid: 1, name: 'aa', level: 2},
 *       {id: 4, pid: 1, name: 'ab', level: 2}
 *     ]
 *   },
 *   {
 *     id: 2,
 *     pid: 0,
 *     name: 'b',
 *     level: 1
 *   }
 * ]
 */

class TreeBuilder {
    constructor(id, pid, level, children) {
        this.id = id;
        this.pid = pid;
        this.level = level;
        this.children = children;
        this.root = [];
    }

    insert(ele) {
        if (ele[this.pid] === 0) {
            this.root.push(ele);
            return;
        }
        const treeRoot = this.find(ele[this.pid]);
        treeRoot[this.children] = treeRoot[this.children] === undefined ? [] : treeRoot[this.children];
        treeRoot[this.children].push(ele);
    }

    find(id, root = this.root) {
        for (let i = 0; i < root.length; i += 1) {
            const ele = root[i];
            if (ele[this.id] === id) {
                return ele;
            }
            if (ele[this.children]) {
                const result = this.find(id, ele[this.children]);
                if (result) return result;
            }
        };
        return null;
    }

    getResult() {
        return this.root;
    }
}
module.exports = function flatten2tree(flattenArr, id = 'id', pid = 'pid', level = 'level', children = 'children') {
    const builder = new TreeBuilder(id, pid, level, children);
    flattenArr.forEach(element => {
        builder.insert(element);
    });
    return builder.getResult();
}
