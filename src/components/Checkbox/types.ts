import { PropType } from 'vue';
import { TreeEventType } from '../Tree/types';

const CheckBoxProps = () => ({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  halfChecked: {
    type: Boolean,
    default: false
  },

  onChange: Function as TreeEventType<boolean>
})


export { CheckBoxProps }