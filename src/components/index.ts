import AfButton from './Button/AfButton'
import AfTree from './Tree/AfTree'
import AfMenu from './Menu/AfMenu'
import AfCheckBox from './Checkbox/AfCheckbox'
import MenuItem from './Menu/MenuItem'
import SubMenu from './Menu/SubMenu'
import { App } from 'vue'



const components = [
  AfButton,
  AfTree,
  AfMenu,
  AfCheckBox,
  MenuItem,
  SubMenu
]


export default function (app: App) {
  // 相当于install
  components.forEach(item => {
    app.component(item.name, item)
  })
}
