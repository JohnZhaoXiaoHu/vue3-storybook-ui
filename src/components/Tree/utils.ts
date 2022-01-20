import { RequiredTreeNodeOptions } from './types';

export function updateDownWards(children: RequiredTreeNodeOptions[], checked: boolean) {


  const update = (children: RequiredTreeNodeOptions[]) => {
    if (children.length) {
      children.forEach(item => {


        item.checked = checked

        update(item.children as RequiredTreeNodeOptions[])
      })
    }
  }

  update(children)


}


export function updateUpWards(node: RequiredTreeNodeOptions, flatList: RequiredTreeNodeOptions[]) {

  const update = (currentNode: RequiredTreeNodeOptions) => {
    if (currentNode.parentKey) {
      const parentNode = flatList.find(item => item.nodeKey === currentNode.parentKey)
      if (parentNode) {
        // 看是否是全选还是半选
        const parentAllChecked = !parentNode.children.some(item => !item.checked)


        if (parentAllChecked) {
          parentNode.checked = parentAllChecked
          update(parentNode)
        }

      }
    }
  }

  update(node)
}