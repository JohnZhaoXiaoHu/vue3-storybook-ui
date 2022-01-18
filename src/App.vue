<template>
  <div class="main">
    <!-- <button-demo></button-demo> -->
    <!-- <menu-demo></menu-demo> -->
    <tree-demo></tree-demo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import ButtonDemo from './components/Button/demo.vue';
// import MenuDemo from './components/Menu/demo.vue';
import TreeDemo from './components/Tree/demo.vue';
export default defineComponent({
  name: 'App',
  components: {
    // ButtonDemo
    // MenuDemo,
    TreeDemo,
  },
  setup() {
    const handleSelect = (selectIndex: string) => {
      console.log('item' + selectIndex + '被选中');
    };
  },
});
</script>

<style lang="scss"></style>
