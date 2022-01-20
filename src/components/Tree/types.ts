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

export interface TreeInstace {
  getSelectNode: () => RequiredTreeNodeOptions | undefined
}

type RequiredTreeNodeOptions = Required<TreeNodeOptions>


type renderFunc = PropType<(node: RequiredTreeNodeOptions) => JSX.Element>

const TreeProps = () => ({
  source: {
    type: Array as PropType<TreeNodeOptions[]>,
    required: true
  },
  showCheckBox: {
    type: Boolean,
    default: false
  },
  checkStrictly: {
    type: Boolean,
    default: false
  },
  render: Function as renderFunc,
  lazyLoad: Function as PropType<(node: RequiredTreeNodeOptions, callback: (children: TreeNodeOptions[]) => void) => void>
})

type TreeEventType<T> = PropType<(arg: T) => void>


const TreeNodeProps = () => ({
  node: {
    type: Object as PropType<RequiredTreeNodeOptions>,
    required: true,
  },
  showCheckBox: {
    type: Boolean,
    default: false
  },
  checkStrictly: {
    type: Boolean,
    default: false
  },
  onCheckChange: Function as TreeEventType<[boolean, RequiredTreeNodeOptions]>,
  render: Function as renderFunc,
  onChildExpand: Function as TreeEventType<RequiredTreeNodeOptions>,
  onSelectChange: Function as TreeEventType<RequiredTreeNodeOptions>,
})


const renderNodeProps = () => ({
  node: {
    type: Object as PropType<RequiredTreeNodeOptions>,
    required: true
  },
  render: {
    type: Function as renderFunc,
    required: true
  }
})


export { TreeEventType, renderNodeProps, TreeNodeProps, TreeNodeOptions, TreeProps, RequiredTreeNodeOptions }