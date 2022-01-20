<template>
  <div class="main">
    <af-check-box v-model="isChecked">checkebox</af-check-box>
    isChecked :{{ isChecked }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AfCheckBox from './index';
export default defineComponent({
  name: 'CheckBoxDemo',
  components: { AfCheckBox },
  setup() {
    const isChecked = ref(false);
    return {
      isChecked,
    };
  },
});
</script>
<style lang="scss"></style>
