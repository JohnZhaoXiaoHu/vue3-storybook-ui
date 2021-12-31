import classNames from 'classnames';
import { cloneVNode, defineComponent, inject, reactive, ref } from 'vue';
import { MenuContext, MenuKey, SubMenuProps } from './types';

const props = SubMenuProps();
export default defineComponent({
  name: 'SubMenu',
  props: props,
  setup(props, { emit, slots, attrs }) {
    const menuOpened = ref(false);
    const parentCtx = inject<MenuContext>(MenuKey);

    const subClass = reactive({
      'af-submenu': true,
      'menu-opened':
        parentCtx?.mode === 'vertical' ? !menuOpened.value : menuOpened.value,
    });
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();

      subClass['menu-opened'] = !subClass['menu-opened'];
    };
    const clickEvents =
      parentCtx?.mode === 'vertical'
        ? {
            onClick: handleClick,
          }
        : {};
    let timer: any;
    const handleMouse = (e: MouseEvent, isOpen: boolean) => {
      e.preventDefault();

      timer = setTimeout(() => {
        subClass['menu-opened'] = isOpen;
      }, 100);
    };

    const hoverEvents =
      parentCtx?.mode !== 'vertical'
        ? {
            onMouseenter: (e: MouseEvent) => {
              handleMouse(e, true);
            },
            onMouseleave: (e: MouseEvent) => {
              handleMouse(e, false);
            },
          }
        : {};

    return () => {
      const { title, index } = props;

      const renderChildren = () => {
        const items = slots.default!().map((item, index) => {
          if ((item.type as any).name === 'MenuItem') {
            return cloneVNode(item, {
              index: `${props.index}-${index.toString()}`,
            });
          } else {
            console.error('must be a MenuItem');
          }
        });

        return items;
      };

      const classes = classNames('menu-item submenu-item', {});
      return (
        <div class={classes} {...hoverEvents}>
          <div class="submenu-title" {...clickEvents}>
            {title}
          </div>
          <ul class={subClass}>{renderChildren()}</ul>
        </div>
      );
    };
  },
});
