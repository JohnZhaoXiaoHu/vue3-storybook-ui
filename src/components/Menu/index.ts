


import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import AfMenu from './AfMenu'

AfMenu.install = (app: App) => {
  app.component(AfMenu.name, AfMenu)
}

export default AfMenu as SFCWithInstall<typeof AfMenu>