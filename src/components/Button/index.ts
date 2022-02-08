


import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import AfButton from './AfButton'

AfButton.install = (app: App) => {
  app.component(AfButton.name, AfButton)
}

export default AfButton as SFCWithInstall<typeof AfButton>