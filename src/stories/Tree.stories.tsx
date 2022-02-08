// import AfButton from './Button.vue';
import {
  RequiredTreeNodeOptions,
  TreeInstace,
  TreeNodeOptions,
} from '@/components/tree/types';
import { PropType, ref } from 'vue';
import AfTree from '../components/Tree/AfTree';
// import { withInfo } from '@storybook/addon-info';
// import { addDecorator } from '@storybook/vue3';
// import { addons,makeDecorator } from '@storybook/addons';

// import { makeDecorator } from '@storybook/addons';
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Example/Tree',
  component: AfTree,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    lazyLoad: {
      control: {
        type: 'object',
      },
    },
    render: {
      control: {
        type: 'object',
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args: any) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AfTree },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    const Atree = ref<TreeInstace>();

    const selectedNode = () => {
      const node = Atree.value!.getSelectNode();
      console.log(node);
    };
    const checkedNodes = () => {
      // const nodes = Atree.value!.getCheckedNodes();
      // console.log(nodes);
    };
    const halfCheckedNodes = () => {
      // const nodes = Atree.value!.getHalfCheckedNodes();
      // console.log(nodes);
    };
    // console.log(node);
    // 仅为含有懒加载部分代码
    const lazyLoad = (
      node: TreeNodeOptions,
      callback: (children: TreeNodeOptions[]) => void,
    ) => {
      console.log('loadData', node);
      const result: TreeNodeOptions[] = [];
      for (let i = 0; i < 4; i += 1) {
        const nodeKey = `${node.nodeKey}-${i}`;
        const treeNode: TreeNodeOptions = {
          nodeKey,
          name: nodeKey,
          children: [],
          hasChildren: true,
          // disabled: i % 2 == 0,
        };
        result.push(treeNode);
      }
      setTimeout(() => {
        callback(result);
      }, 500);
    };
    // :lazyLoad="lazyLoad"

    //renderNode的部分仅为CustomNode 代码
    // const renderNode = (node: TreeNodeOptions) => {
    //   return (
    //     <div style="padding: 0 4px;">
    //       <b style="color: #f60;">{node.name}</b>
    //     </div>
    //   );
    // };
    // :render="renderNode"
    return {
      args,
      selectedNode,
      Atree,
      checkedNodes,
      halfCheckedNodes,
      renderNode,
      lazyLoad,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `  <button  @click="selectedNode"  >获取选中节点</button> 
  <button   @click="checkedNodes">获取勾选节点</button>
  <button   @click="halfCheckedNodes">获取半勾选节点</button>
  <af-tree ref="Atree" :lazyLoad="lazyLoad" v-bind="args">
</af-tree>`,
});

function recursionPrimary(path = '0', level = 3): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 6; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: true,
    };

    if (level > 0) {
      treeNode.children = recursionPrimary(nodeKey, level - 1);
    } else {
      treeNode.hasChildren = false;
    }

    list.push(treeNode);
  }
  return list;
}

const lazyLoad = (
  node: TreeNodeOptions,
  callback: (children: TreeNodeOptions[]) => void,
) => {
  console.log('loadData', node);
  const result: TreeNodeOptions[] = [];
  for (let i = 0; i < 4; i += 1) {
    const nodeKey = `${node.nodeKey}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: true,
      // disabled: i % 2 == 0,
    };
    result.push(treeNode);
  }
  setTimeout(() => {
    callback(result);
  }, 500);
};

function recursionLazy(path = '0'): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < 2; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],

      selected: nodeKey === '0-0',
      hasChildren: true,
    };
    list.push(treeNode);
  }
  return list;
}

// const defualtButton = () => {
//   <AfButton onClick={action('clicked')}> defualtButton</AfButton>;
// };
// storiesOf('button component',module)
//   .add('默认 Button',defaultButton)

export const Primary = Template.bind({});

(Primary as any).args = {
  source: recursionPrimary(),
};

export const Lazyload = Template.bind({});

(Lazyload as any).args = {
  source: recursionLazy(),
  lazyLoad: lazyLoad,
};

export const checkedlazy = Template.bind({});

(checkedlazy as any).args = {
  source: recursionLazy(),
  lazyLoad: lazyLoad,
  showCheckBox: true,
  checkStrictly: true,
};

export const checkedlazylink = Template.bind({});

(checkedlazylink as any).args = {
  source: recursionLazy(),
  lazyLoad: lazyLoad,
  showCheckBox: true,
  checkStrictly: false,
};

export const customeNode = Template.bind({});
const renderNode = (node: TreeNodeOptions) => {
  return (
    <div style="padding: 0 4px;">
      <b style="color: #f60;">{node.name}</b>
    </div>
  );
};

(customeNode as any).args = {
  source: recursionLazy(),
  lazyLoad: lazyLoad,
  showCheckBox: true,
  checkStrictly: false,
  render: renderNode,
};
