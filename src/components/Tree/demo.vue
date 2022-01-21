<template>
  <div class="main">
    <button @click="selectNode">获取选中节点</button>
    <button @click="checkedNodes">获取勾选节点</button>
    <button @click="halfCheckedNodes">获取半勾选节点</button>
    <af-tree
      :source="source"
      :lazyLoad="lazyLoad"
      show-check-box
      ref="tree"
    ></af-tree>
  </div>
</template>

<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue';
import AfTree from './index';
import { RequiredTreeNodeOptions, TreeInstace, TreeNodeOptions } from './types';
export default defineComponent({
  name: 'TreeDemo',
  components: { AfTree },
  setup() {
    const source = ref<TreeNodeOptions[]>([]);

    // const getSourceData = (path = '0', level = 3): TreeNodeOptions[] => {
    //   const res: TreeNodeOptions[] = [];

    //   for (let i = 0; i < 5; i++) {
    //     const nodeKey = `${path}-${i}`;
    //     const arr = [];
    //     const node: TreeNodeOptions = {
    //       nodeKey,
    //       name: nodeKey,
    //       level: level,
    //       hasChildren: true,
    //     };

    //     if (level > 0) {
    //       node.children = getSourceData(nodeKey, level - 1);
    //     } else {
    //       node.hasChildren = false;
    //     }

    //     res.push(node);
    //   }

    //   return res;
    // };

    const getSourceData = (path = '0'): TreeNodeOptions[] => {
      const res: TreeNodeOptions[] = [];

      for (let i = 0; i < 2; i++) {
        const nodeKey = `${path}-${i}`;

        const node: TreeNodeOptions = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true,
        };

        res.push(node);
      }

      return res;
    };

    const lazyLoad = (
      node: TreeNodeOptions,
      callback: (children: TreeNodeOptions[]) => void,
    ) => {
      let res: TreeNodeOptions[] = [];

      for (let i = 0; i < 4; i++) {
        const nodeKey = `${node.nodeKey}-${i}`;
        const TreeNode: TreeNodeOptions = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true,
          // disabled: i % 2 === 0,
        };

        res.push(TreeNode);
      }

      setTimeout(() => {
        callback(res);
      }, 500);
    };

    onMounted(() => {
      source.value = getSourceData();
      console.log('source:', source.value);
    });

    const renderFunc = (node: RequiredTreeNodeOptions): JSX.Element => {
      return <div style="color:red">{node.name}</div>;
    };

    const tree = ref<TreeInstace>();

    const selectNode = () => {
      console.log('tree', tree.value);
      const selectedNode = tree.value!.getSelectNode();
      console.log('selectednode', selectedNode);
    };

    const checkedNodes = () => {
      console.log('checkedFunc');
      const selectedNode = tree.value!.getCheckedNodes();
      console.log('checkednode', selectedNode);
    };

    const halfCheckedNodes = () => {
      console.log('checkedFunc');
      const halfCheckedNodes = tree.value!.getHalfCheckedNodes();
      console.log('halfCheckedNodes', halfCheckedNodes);
    };

    return {
      source,
      lazyLoad,
      renderFunc,
      selectNode,
      checkedNodes,
      halfCheckedNodes,
      tree,
    };
  },
});
</script>
<style lang="scss"></style>
