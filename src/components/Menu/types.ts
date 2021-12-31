import { PropType } from 'vue';

enum ModeType {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}
const MenuKey = 'menukey'


type SelectFunc = (selectIndex: string) => void

const MenuProps = () => ({
  mode: {
    type: String as PropType<ModeType>,
    default: ModeType.HORIZONTAL
  },
  defaultIndex: {
    type: String,
    default: '1'
  },
  onSelect: Function as PropType<SelectFunc>
})


const MenuItemProps = () => ({
  index: String,
  disabled: {
    type: Boolean,
    default: false
  }
})

interface MenuContext {
  mode: ModeType,
  defaultIndex: String,
  onSelect: SelectFunc,
}


const SubMenuProps = () => ({
  index: String,
  title: {
    type: String,
    default: '下拉'
  }
})


export { SubMenuProps, MenuKey, MenuContext, ModeType, SelectFunc, MenuProps, MenuItemProps }