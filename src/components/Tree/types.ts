import { PropType } from 'vue';

interface TreeNodeOptions {
  nodeKey: string, //节点的唯一标志
  name: string, //渲染使用
  children?: TreeNodeOptions[],
  loading?: boolean,  //懒加载使用
  hasChildren?: boolean, //是否有子节点
  selected?: boolean, //是否被选中
  checked?: boolean, //  是否被勾选             
  expanded?: boolean, //是否扩展子节点
  level?: number, //树的层级
  parentKey?: string | null,
  disabled?: boolean

}

type RequiredTreeNodeOptions = Required<TreeNodeOptions>

const TreeProps = () => ({
  source: {
    type: Array as PropType<TreeNodeOptions[]>,
    required: true
  }
})


const TreeNodeProps = () => ({
  node: {
    type: Object as PropType<RequiredTreeNodeOptions>,
    required: true,
  },
  onChildExpand: Function as PropType<(node: RequiredTreeNodeOptions) => void>
})


export { TreeNodeProps, TreeNodeOptions, TreeProps, RequiredTreeNodeOptions }