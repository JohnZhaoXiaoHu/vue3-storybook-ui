
import { App } from 'vue';
import { SFCWithInstall } from '../utils/types';
import AfTree from './AfTree';

AfTree.install = (app: App) => {
  app.component(AfTree.name, AfTree)
}

export default AfTree as SFCWithInstall<typeof AfTree>