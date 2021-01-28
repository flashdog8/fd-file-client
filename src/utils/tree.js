/**
 * 递归遍历查找并消费
 * @param {Array} listItem
 * @param {function} test
 * @param {function} accept
 */
export function findAndAccept1(listItem, test, accept) {
  let i, currentItem
  for (i in listItem) {
    currentItem = listItem[i]
    if (test(currentItem)) {
      accept(currentItem)
      return true
    }
    if (currentItem.children && currentItem.children !== null && currentItem.children.length > 0 && findAndAccept1(currentItem.children, test, accept)) {
      return true
    }
  }
  return false
}

/**
 * 栈遍历查找并消费
 * @param {Array} listItem
 * @param {function} test
 * @param {function} accept
 */
export function findAndAccept2(listItem, test, accept) {
  let currentItem
  const stack = [{
    value: null,
    label: null,
    children: listItem
  }]
  while (stack.length > 0) {
    currentItem = stack.shift()
    if (test(currentItem)) {
      accept(currentItem)
      break
    }
    if (currentItem.children && currentItem.children !== null && currentItem.children.length > 0) {
      stack.unshift(...currentItem.children)
    }
  }
}

/**
 * 构建上下节点信息的树
 * @param {Object} parent
 * @param {Array} listItem
 */
export function treeing(parent, listItem) {
  listItem.forEach(e => {
    const child = {
      value: e.value,
      label: e.label,
      tag: e.tag,
      parent: parent,
      children: []
    }
    parent.children.push(child)
    if (e.children && e.children !== null && e.children.length > 0) {
      treeing(child, e.children)
    }
  })
}

/**
 * 栈遍历查找并消费，并返回匹配的链路节点
 * @param {Array} listItem
 * @param {function} test
 * @param {function} accept
 */
export function findAndAccept3(listItem, test, accept) {
  let currentItem
  const root = {
    value: null,
    label: null,
    parent: null,
    children: []
  }
  treeing(root, listItem)
  const stack = [root]
  const parentStack = []
  while (stack.length > 0) {
    currentItem = stack.shift()
    if (test(currentItem)) {
      accept(currentItem)
      let parentItem = currentItem
      parentStack.unshift(parentItem)
      while (parentItem.parent !== null && parentItem.parent.value !== null) {
        parentStack.unshift(parentItem.parent)
        parentItem = parentItem.parent
      }
      break
    }
    if (currentItem.children && currentItem.children !== null && currentItem.children.length > 0) {
      stack.unshift(...currentItem.children)
    }
  }
  return parentStack
}
