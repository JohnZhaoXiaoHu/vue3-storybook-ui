import { cloneDeep } from 'lodash';
import { RequiredTreeNodeOptions, TreeNodeOptions } from './types';



export function flattenData(
  source: TreeNodeOptions[],
): RequiredTreeNodeOptions[] {
  const res: RequiredTreeNodeOptions[] = [];

  const dp = (
    list: TreeNodeOptions[],
    level = 0,
    parent: RequiredTreeNodeOptions | null = null,
  ) => {
    return list.map((item) => {
      const node: RequiredTreeNodeOptions = {
        ...item,
        level,
        children: item.children || [],
        loading: item.loading || false,
        hasChildren: item.hasChildren || false,
        selected: item.selected || false,
        checked: item.checked || false,
        expanded: item.expanded || false,
        parentKey: parent?.nodeKey || null,
        disabled: item.disabled || false,
      };

      res.push(node);

      if (node.children.length && item.expanded) {
        node.children = dp(node.children, level + 1, node);
      }
      return node;
    });
  };
  if (source.length) {
    dp(source);
  }

  return res;
};



export const expandNode = (
  node: RequiredTreeNodeOptions,
  flatList: RequiredTreeNodeOptions[],
  children?: TreeNodeOptions[],

) => {
  const deepChildren = children ? children : cloneDeep(node.children);

  node.children = deepChildren.map((item) => {
    return {
      ...item,
      level: item.level || node.level + 1,
      children: item.children || [],
      loading: item.loading || false,
      hasChildren: item.hasChildren || false,
      selected: item.selected || false,
      checked: item.checked || false,
      expanded: item.expanded || false,
      parentKey: node.nodeKey || null,
      disabled: item.disabled || false,
    };
  });

  const index = flatList.findIndex(
    (item) => node.nodeKey === item.nodeKey,
  );

  flatList.splice(
    index + 1,
    0,
    ...(node.children as RequiredTreeNodeOptions[]),
  );
};



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


        if (parentAllChecked !== parentNode.checked) {
          parentNode.checked = parentAllChecked
          update(parentNode)
        }

      }
    }
  }

  update(node)
}