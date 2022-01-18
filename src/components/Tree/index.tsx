import { defineComponent, ref, watch } from 'vue';
import { RequiredTreeNodeOptions, TreeNodeOptions, TreeProps } from './types';
import TreeNode from './TreeNode';
import './index.scss';
import { cloneDeep } from 'lodash';

const props = TreeProps();
export default defineComponent({
  name: 'AfTree',
  props: props,
  components: {
    TreeNode,
  },
  setup(props, { emit }) {
    const flatList = ref<RequiredTreeNodeOptions[]>([]);

    const flattenData = (
      source: TreeNodeOptions[],
    ): RequiredTreeNodeOptions[] => {
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

    watch(
      () => props.source,
      (newValue) => {
        flatList.value = flattenData(newValue as TreeNodeOptions[]);
        console.log(flatList.value);
      },
    );

    const expandNode = (node: RequiredTreeNodeOptions) => {
      const deepChildren = cloneDeep(node.children);

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

      const index = flatList.value.findIndex(
        (item) => node.nodeKey === item.nodeKey,
      );

      flatList.value.splice(
        index + 1,
        0,
        ...(node.children as RequiredTreeNodeOptions[]),
      );
    };

    const handleExpand = (node: RequiredTreeNodeOptions) => {
      node.expanded = !node.expanded;

      if (node.expanded) {
        if (node.children.length) {
          expandNode(node);
        }
      }
    };

    return () => {
      const renderNodes = (): JSX.Element[] => {
        return flatList.value.map((node: RequiredTreeNodeOptions) => {
          return <TreeNode node={node} onChildExpand={handleExpand}></TreeNode>;
        });
      };

      return (
        <div class="af-tree-wrap">
          <div class="af-tree">{renderNodes()}</div>
        </div>
      );
    };
  },
});
