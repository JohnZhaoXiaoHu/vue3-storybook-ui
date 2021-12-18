import classNames from 'classnames';
import { defineComponent } from 'vue';
import { btnProps, ButtonTypes } from './types';
import './index.scss';
const props = btnProps();

export default defineComponent({
  name: 'AfButton',
  props: props,
  setup(props, { emit, attrs }) {
    return () => {
      const { btnType, href, label, size, disabled, backgroundColor } = props;
      const classes = classNames('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        ['disabled']: btnType !== ButtonTypes.LINK && disabled,
      });

      const styles = {
        backgroundColor: backgroundColor,
      };
      if (btnType === ButtonTypes.LINK && href) {
        return (
          <a {...attrs} href={href} class={classes} style={styles}>
            {label}
          </a>
        );
      } else {
        return (
          <button {...attrs} disabled={disabled} class={classes} style={styles}>
            {label}
          </button>
        );
      }
    };
  },
});
