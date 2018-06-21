import Element from './react'

export default function diff(oldDomTree, newDomTree){
  // 用于记录差异
  let patches = {}
  // 一开始的索引为0
  dfs(oldDomTree, newDomTree, 0, patches)
  return patches
}
function dfs(oldNode, newNode, index, patches){
  // 用于保存子树的更改
  let curPatches = []
  // 需要判断三种情况
  // 1. 没有新的节点，name什么都不用做
  // 2. 新的节点tagName 和 'key' 和旧的不同，就替换
  // 3. 新的节点tagName 和 key（可能没有）和旧的相同， 开始遍历子树
  if(!newNode){
    return
  }else if(newNode.tag === oldNode.tag && newNode.key === oldNode.key){
    // 判断属性是否变更
    let props = diffProps(oldNode.props, newNode.props)
    if(props.length) curPatches.push({type: StateEnums.ChangeProps, props})
    // 遍历子树
    diffChildren(oldNode.children, newNode.children, index, patches)
  }else {
    // 节点不同，需要替换
    curPatches.push({type: StateEnums.Replace, node: newNode})
  }

  if(curPatches.length){
    if(patches[index]){
      patches[index] = patches[index].concat(curPatches)
    }else{
      patches[index] = curPatches
    }
  }
}

function diffProps(oldProps, newProps){
  // 判断 Props 分以下三个步骤
  // 先遍历 oldProps 查看是否存在删除的属性
  // 然后遍历 newProps 查看是否有数性质被修改
  // 最后查看是否有新属性增加
  let change = []
  for(const key in oldProps){
    if(oldProps.hasOwnProperty(key) && !newProps.hasOwnProperty(key)){
      change.push({
        prop: key
      })
    }
  }
  for(const key in newProps){
    if(newProps.hasOwnProperty(key)){
      const prop = newProps[key]
      if(oldProps[key] && oldProps[key] !== newProps[key]){
        change.push({
          prop: key,
          value: newProps[key]
        })
      }else if(!oldProps[key]){
        // 新增元素
        change.push({
          prop: key,
          value: newProps[key]
        })
      }
    }
  }
  return change
}

function listDiff(oldList, newList, index, pathces){
  // 为了遍历方便，先去出两个list的所有的key
  let oldKeys = getKeys(oldList)
  let newKeys = getKeys(newList)
  let change = []
  // 用于保存变更后的几点数据
  // 使用该数组保存有以下好处
  // 1. 可以正确获得被删除节点索引
  // 2. 交换节点位置只需要操作一遍
  // 3. 用于 diffChildren 函数中的判断， 只需要遍历
  // 两个树中都存在的节点，而对于新增或者删除的节点来说，完全没必要再去判断一遍
  let list = []
  oldList &&
    oldList.forEach(item => {
      let key = item.key
      if(typeof(key) === 'string'){
        key = item
      }
      // 寻找新的 children 中是否含有当前节点
      // 没有的话需要删除
      let index = newKeys.indexOf(key)
      if(index === -1){
        list.push(null)
      }else list.push(key)
    })
    // 遍历变更后的数组
    let length = list.length
    // 因为删除数组元素实惠更改索引的
    // 所以从后往前删除可以保证索引不变
    for(let i = length - 1; i>= 0;i--){
      // 判断当前元素是否为空，为空表示需要删除
    }
}