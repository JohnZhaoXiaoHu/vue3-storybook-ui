import { defineComponent } from 'vue';
import { TreeNodeProps } from './types';
const props = TreeNodeProps();
import './iconfont.css';
import './index.scss';
export default defineComponent({
  name: 'TreeNode',
  props: props,
  emits: ['child-expand'],
  setup(props, { emit }) {
    return () => {
      const { node } = props;

      const handleIconClick = (e: MouseEvent) => {
        e.stopPropagation();

        emit('child-expand', props.node);
      };

      const renderIcon = (): JSX.Element => {
        return (
          <div
            onClick={handleIconClick}
            class={['node-arrow', node?.expanded ? 'expanded' : '']}
          >
            {node?.hasChildren ? <i class="iconfont iconExpand" /> : null}
          </div>
        );
      };

      return (
        <div
          class="af-tree-node"
          style={{ paddingLeft: `${props.node!.level * 15}px` }}
        >
          {renderIcon()}
          <div class="node-content">
            <div class="node-title">{node!.name}</div>
          </div>
        </div>
      );
    };
  },
});
