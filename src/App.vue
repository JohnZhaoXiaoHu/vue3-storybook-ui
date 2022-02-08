<template>
  <div class="main">
    <!-- <button-demo></button-demo> -->
    <!-- <menu-demo></menu-demo> -->
    <!-- <tree-demo></tree-demo> -->
    <!-- <check-box-demo></check-box-demo> -->
    <af-menu :onSelect="handleSelect" mode="vertical">
      <menu-item>item1</menu-item>
      <menu-item>item2</menu-item>
      <sub-menu>
        <menu-item>item1</menu-item>
        <menu-item>item2</menu-item>
        <menu-item>item3</menu-item>
      </sub-menu>

      <menu-item>item3</menu-item>
    </af-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// import ButtonDemo from './components/Button/demo.vue';
// import MenuDemo from './components/Menu/demo.vue';
// import TreeDemo from './components/Tree/demo.vue';
// import CheckBoxDemo from './components/Checkbox/demo.vue';
export default defineComponent({
  name: 'App',
  components: {
    // ButtonDemo
    // MenuDemo,
    // TreeDemo,
    // CheckBoxDemo,
  },
  setup() {},
});
</script>

<style lang="scss"></style>
