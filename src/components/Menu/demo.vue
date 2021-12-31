<template>
  <div class="main">
    <af-menu :onSelect="handleSelect">
      <menu-item disabled="true"> item1</menu-item>
      <menu-item>item2</menu-item>
      <sub-menu>
        <menu-item> item1</menu-item>
        <menu-item>item2</menu-item>
        <menu-item>item3</menu-item>
      </sub-menu>
      <menu-item>item3</menu-item>
    </af-menu>

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
import { defineComponent } from 'vue';
import AfMenu from './index';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
export default defineComponent({
  name: 'App',
  components: {
    AfMenu,
    MenuItem,
    SubMenu,
  },
  setup() {
    const handleSelect = (selectIndex: string) => {
      alert(`${selectIndex}号item被选中`);
    };
    return {
      handleSelect,
    };
  },
});
</script>
<style lang="scss"></style>
