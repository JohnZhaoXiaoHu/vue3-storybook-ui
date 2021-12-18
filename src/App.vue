<template>
  <div class="main">
    <button-demo></button-demo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonDemo from './components/Button/demo.vue';
export default defineComponent({
  name: 'App',
  components: { ButtonDemo },
});
</script>

<style lang="scss"></style>
