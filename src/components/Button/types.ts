import { PropType } from 'vue'

enum ButtonTypes {
  LINK = 'link',
  DANGER = 'danger',
  PRIMARY = 'primary',
  DEFAULT = 'default'
}


enum SizeTypes {
  LARGE = 'large',
  SMALL = 'small'
}

const btnProps = () => ({
  label: String,
  btnType: {
    type: String as PropType<ButtonTypes>,
    default: ButtonTypes.DEFAULT
  },
  href: String,
  disabled: {
    type: Boolean,
    default: false
  },
  backgroundColor: String,
  size: {
    type: String as PropType<SizeTypes>,
    default: SizeTypes.SMALL
  }
})

export { btnProps, ButtonTypes, SizeTypes }