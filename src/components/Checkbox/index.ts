


import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import AfCheckbox from './AfCheckbox'

AfCheckbox.install = (app: App) => {
  app.component(AfCheckbox.name, AfCheckbox)
}

export default AfCheckbox as SFCWithInstall<typeof AfCheckbox>