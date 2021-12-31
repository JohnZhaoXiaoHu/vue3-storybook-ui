import classNames from 'classnames';
import { defineComponent, inject } from 'vue';
import { MenuContext, MenuItemProps, MenuKey } from './types';

const props = MenuItemProps();
export default defineComponent({
  name: 'MenuItem',
  props: props,
  setup(props, { emit, slots }) {
    const parentCtx = inject<MenuContext>(MenuKey);
    const classes = classNames('menu-item', {
      'is-active': parentCtx?.defaultIndex === props.index,
      'is-disabled': props.disabled,
    });

    // console.log(parentCtx);

    return () => {
      const { index, disabled } = props;

      const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        if (parentCtx?.onSelect && !disabled) {
          parentCtx.onSelect(index!);
        }
      };

      return (
        <li class={classes} onClick={handleClick}>
          {slots.default!()}
        </li>
      );
    };
  },
});
