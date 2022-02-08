// import AfButton from './Button.vue';
import { ref } from 'vue';
import AfCheckBox from '../components/Checkbox/AfCheckbox';

// import { withInfo } from '@storybook/addon-info';
// import { addDecorator } from '@storybook/vue3';
// import { addons,makeDecorator } from '@storybook/addons';

// import { makeDecorator } from '@storybook/addons';
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Checkbox',
  component: AfCheckBox,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AfCheckBox },
  emits: ['check-change'],
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup(emits: any) {
    const isChecked = ref(false);
    // const hanldeChange = (check: boolean) => {
    //   emits('check-change', check);
    // };
    return {
      args,
      isChecked,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `  <af-check-box onChange=""  v-model="isChecked">checkebox</af-check-box>
  isChecked :{{ isChecked }} `,
});

export const Primary = Template.bind({});

(Primary as any).args = {
  modelValue: false,
  disabled: false,
  halfChecked: false,
};
