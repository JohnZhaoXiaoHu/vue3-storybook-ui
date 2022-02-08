import { computed, defineComponent } from 'vue';
import { CheckBoxProps } from './types';
import './index.scss';

const props = CheckBoxProps();

export default defineComponent({
  name: 'AfCheckBox',
  props: props,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();

      if (!props.disabled) {
        emit('update:modelValue', !props.modelValue);
        emit('change', !props.modelValue);
      }
    };

    const classes = computed(() => {
      return {
        'af-checkbox': true,
        'half-checked': props.halfChecked,
        checked: props.modelValue,
        disabled: props.disabled,
      };
    });

    return () => {
      return (
        <div class={classes.value}>
          <div class="inner" onClick={handleClick}></div>

          <div class="content">{slots.default && slots.default()}</div>
        </div>
      );
    };
  },
});
