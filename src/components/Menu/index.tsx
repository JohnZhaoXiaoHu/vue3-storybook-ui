import classNames from 'classnames';
import { cloneVNode, defineComponent, provide } from 'vue';
import { MenuContext, MenuKey, MenuProps, ModeType } from './types';
import './index.scss';

const props = MenuProps();
export default defineComponent({
  name: 'AfMenu',
  props: props,
  setup(props, { emit, slots, attrs }) {
    const parentContext = provide<Partial<MenuContext>>(MenuKey, {
      mode: props.mode,
      defaultIndex: props.defaultIndex,
      onSelect: props.onSelect,
    });

    return () => {
      const { mode, defaultIndex, onSelect } = props;
      const classes = classNames('af-menu', {
        'menu-horizontal': mode === ModeType.HORIZONTAL,
        'menu-vertical': mode !== ModeType.HORIZONTAL,
      });

      const renderChildren = () => {
        const items = slots.default!().map((item, index) => {
          if ((item.type as any).name === 'MenuItem' || 'SubMenu') {
            return cloneVNode(item, {
              index: index.toString(),
            });
          } else {
            console.error('must be a MenuItem or a SubMenu');
          }
        });

        return items;
      };

      return <ul class={classes}>{renderChildren()}</ul>;
    };
  },
});
