<template>
  <div class="main">
    <af-button
      btnType="link"
      href="https://www.baidu.com"
      label="链接"
    ></af-button>
    <af-button label="按钮" autoFocus backgroundColor="green"></af-button>
    <af-button label="按钮" btnType="primary"></af-button>
    <af-button label="按钮" btnType="danger" size="large" disabled></af-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AfButton from './index';
export default defineComponent({
  name: 'ButtonDeom',
  components: { AfButton },
});
</script>
<style lang="scss"></style>
