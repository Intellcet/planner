import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.pcss';

export const BUTTON_TYPE = {
  submit: 'submit',
  button: 'button',
  reset: 'reset',
};

type ButtonProps = {
  type?: keyof typeof BUTTON_TYPE;
  view?: 'simple' | 'circle';
  content?: React.ReactNode;
  onClick: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
  classNameButton?: string;
  classNameIcon?: string;
  classNameText?: string;
};

const Button = (props: ButtonProps): React.ReactElement => {
  const {
    view = 'simple',
    type = 'button',
    content,
    onClick,
    classNameButton,
    classNameIcon,
    classNameText,
    children,
  } = props;

  const handleClick = (event: React.SyntheticEvent): void => {
    event.stopPropagation();
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={clsx(
        styles.container,
        view === 'simple' && styles.containerText,
        view === 'circle' && styles.containerCircle,
        classNameButton
      )}
      type={type}
      onClick={handleClick}
    >
      {content && <div className={clsx(classNameIcon)}>{content}</div>}
      {children && <div className={clsx(classNameText)}>{children}</div>}
    </button>
  );
};

export default Button;
