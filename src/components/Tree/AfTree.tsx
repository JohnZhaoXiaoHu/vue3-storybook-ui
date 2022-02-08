import { defineComponent, ref, watch } from 'vue';
import {
  RequiredTreeNodeOptions,
  TreeInstace,
  TreeNodeInstance,
  TreeNodeOptions,
  TreeProps,
} from './types';
import TreeNode from './TreeNode';
import './index.scss';
import { cloneDeep } from 'lodash';
import {
  updateDownWards,
  updateUpWards,
  flattenData,
  expandNode,
} from './utils';

const props = TreeProps();
export default defineComponent({
  name: 'AfTree',
  props: props,
  components: {
    TreeNode,
  },
  setup(props, { emit, expose }) {
    const flatList = ref<RequiredTreeNodeOptions[]>([]);
    const seletKey = ref('');

    watch(
      () => props.source,
      (newValue) => {
        flatList.value = flattenData(newValue as TreeNodeOptions[]);
        console.log('source', flatList.value);
      },
      { immediate: true },
    );

    const collapseNode = (node: RequiredTreeNodeOptions) => {
      const deleleKeys: string[] = [];

      const dp = (currtNode: RequiredTreeNodeOptions) => {
        if (currtNode.children.length) {
          node.children.forEach((item) => {
            deleleKeys.push(item.nodeKey);

            if (item.expanded) {
              item.expanded = false;

              dp(item as RequiredTreeNodeOptions);
            }
          });
        }
      };

      dp(node);

      if (deleleKeys.length) {
        // 只要是deleteKeys数组里面有的我们都不要
        flatList.value = flatList.value.filter(
          (item) => !deleleKeys.includes(item.nodeKey),
        );
      }
    };

    const handleExpand = (node: RequiredTreeNodeOptions) => {
      node.expanded = !node.expanded;

      if (node.expanded) {
        // 展开树的子节点
        if (node.children.length) {
          expandNode(node, flatList.value);
        } else {
          if (props.lazyLoad) {
            node.loading = true;
            props.lazyLoad(node, (children: TreeNodeOptions[]) => {
              if (children.length) {
                expandNode(node, flatList.value, children);
                node.loading = false;
              }
            });
          }
        }
      } else {
        // 收起树的子节点

        collapseNode(node);
      }
    };

    const handSelectChange = (node: RequiredTreeNodeOptions) => {
      node.selected = !node.selected;

      if (seletKey.value === node.nodeKey) {
        seletKey.value = '';
      } else {
        // 点击其他节点
        const preIndex = flatList.value.findIndex(
          (item) => item.nodeKey === seletKey.value,
        );

        if (preIndex > -1) {
          flatList.value[preIndex].selected = false;
        }

        seletKey.value = node.nodeKey;
      }
    };

    const handleCheckChange = ([checked, node]: [
      boolean,
      RequiredTreeNodeOptions,
    ]) => {
      node.checked = checked;

      if (!props.checkStrictly) {
        // 向下递归更新子组件check状态
        updateDownWards(node.children as RequiredTreeNodeOptions[], checked);

        // 向上递归更新父节点
        updateUpWards(node, flatList.value);
      }
    };
    const nodeRefs = ref<TreeNodeInstance[]>([]);
    expose({
      getSelectNode: (): RequiredTreeNodeOptions | undefined => {
        return flatList.value.find((item) => item.selected);
      },
      getCheckedNodes: (): RequiredTreeNodeOptions[] | undefined => {
        return flatList.value.filter((item) => item.checked);
      },
      getHalfCheckedNodes: (): RequiredTreeNodeOptions[] | undefined => {
        return nodeRefs.value
          .filter((item) => item.isHalfChecked())
          .map((item) => item.node);
      },
    });

    const setNodeRefs = (index: number, node: TreeNodeInstance) => {
      if (node) {
        nodeRefs.value[index] = node;
      }
    };

    return () => {
      const renderNodes = (): JSX.Element[] => {
        return flatList.value.map(
          (node: RequiredTreeNodeOptions, index: number) => {
            return (
              <TreeNode
                node={node}
                onSelectChange={handSelectChange}
                onChildExpand={handleExpand}
                render={props.render}
                showCheckBox={props.showCheckBox}
                onCheckChange={handleCheckChange}
                ref={setNodeRefs.bind(null, index) as any}
              ></TreeNode>
            );
          },
        );
      };

      return (
        <div class="af-tree-wrap">
          <div class="af-tree">{renderNodes()}</div>
        </div>
      );
    };
  },
});
