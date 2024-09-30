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
  category: 'buttonText' | 'buttonCircle';
  content?: React.ReactNode;
  onClick: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
  customButton?: string;
  customIcon?: string;
  customText?: string;
};

const Button = (props: ButtonProps): React.ReactElement => {
  const {
    category,
    type = 'button',
    content,
    onClick,
    customButton,
    customIcon,
    customText,
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
        category === 'buttonText' && styles.containerText,
        category === 'buttonCircle' && styles.containerCircle,
        customButton
      )}
      type={type}
      onClick={handleClick}
    >
      {content ? <div className={clsx(customIcon)}>{content}</div> : ''}
      {children ? <div className={clsx(customText)}>{children}</div> : ''}
    </button>
  );
};

export default Button;
