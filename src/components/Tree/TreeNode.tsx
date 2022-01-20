import { computed, defineComponent } from 'vue';
import { TreeNodeProps } from './types';
const props = TreeNodeProps();
import './iconfont.css';
import './index.scss';
// import classNames from 'classnames';
import RenderNode from './renderNode';
export default defineComponent({
  name: 'TreeNode',
  props: props,
  emits: ['child-expand', 'select-change'],
  components: {
    RenderNode,
  },
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
            {node?.hasChildren ? (
              node.loading ? (
                <i class="iconfont  iconloading ico-loading"></i>
              ) : (
                <i class="iconfont iconExpand" />
              )
            ) : null}
          </div>
        );
      };
      // <i class="iconfont iconExpand" />

      console.log('props.node.disabled', props.node?.disabled);

      const classes = computed(() => {
        return {
          'node-title': true,
          disabled: props.node?.disabled,
          selected: props.node?.selected,
        };
      });

      const handleSelect = (e: MouseEvent) => {
        e.stopPropagation();

        emit('select-change', props.node);
      };

      const renderContent = (): JSX.Element => {
        return (
          <div class="node-content">
            {props.render ? (
              <RenderNode render={props.render} node={props.node}></RenderNode>
            ) : (
              <div class={classes.value} onClick={handleSelect}>
                {node!.name}
              </div>
            )}
          </div>
        );
      };
      return (
        <div
          class="af-tree-node"
          style={{ paddingLeft: `${props.node!.level * 15}px` }}
        >
          {renderIcon()}
          {renderContent()}
        </div>
      );
    };
  },
});
