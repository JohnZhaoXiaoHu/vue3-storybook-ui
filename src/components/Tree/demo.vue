<template>
  <div class="main">
    <af-tree :source="source"></af-tree>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import AfTree from './index';
import { TreeNodeOptions } from './types';
export default defineComponent({
  name: 'TreeDemo',
  components: { AfTree },
  setup() {
    const source = ref<TreeNodeOptions[]>([]);

    const getSourceData = (path = '0', level = 3): TreeNodeOptions[] => {
      const res: TreeNodeOptions[] = [];

      for (let i = 0; i < 5; i++) {
        const nodeKey = `${path}-${i}`;
        const arr = [];
        const node: TreeNodeOptions = {
          nodeKey,
          name: nodeKey,
          level: level,
          hasChildren: true,
        };

        if (level > 0) {
          node.children = getSourceData(nodeKey, level - 1);
        } else {
          node.hasChildren = false;
        }

        res.push(node);
      }

      return res;
    };

    onMounted(() => {
      source.value = getSourceData();
      console.log('source:', source.value);
    });

    return {
      source,
    };
  },
});
</script>
<style lang="scss"></style>
