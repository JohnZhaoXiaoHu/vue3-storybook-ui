import { computed, defineComponent, ref } from 'vue';
import { TreeNodeProps } from './types';
import AfCheckbox from '../Checkbox';
const props = TreeNodeProps();
import './iconfont.css';
import './index.scss';
// import classNames from 'classnames';
import RenderNode from './renderNode';
export default defineComponent({
  name: 'TreeNode',
  props: props,
  emits: ['child-expand', 'select-change', 'check-change'],
  components: {
    RenderNode,
    AfCheckbox,
  },
  setup(props, { emit, expose }) {
    const isHalfChecked = computed(() => {
      let res = false;

      if (!props.checkStrictly && props.node?.children) {
        const checkedChild = props.node.children.filter((item) => item.checked);

        res =
          checkedChild.length > 0 &&
          checkedChild.length < props.node.children.length;
      }

      return res;
    });

    expose({
      node: props.node,
      isHalfChecked: () => isHalfChecked.value,
    });
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

      const handleCheckChange = (check: boolean) => {
        emit('check-change', [check, props.node]);
      };
      const renderContent = (): JSX.Element => {
        return (
          <div class="node-content">
            {props.showCheckBox ? (
              <AfCheckbox
                disabled={node?.disabled}
                halfChecked={isHalfChecked.value}
                modelValue={props.node?.checked}
                onChange={handleCheckChange}
              >
                {' '}
                {renderSameContent()}
              </AfCheckbox>
            ) : (
              renderSameContent()
            )}
          </div>
        );
      };

      const renderSameContent = (): JSX.Element => {
        return props.render ? (
          <RenderNode render={props.render} node={props.node}></RenderNode>
        ) : (
          <div class={classes.value} onClick={handleSelect}>
            {node!.name}
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
