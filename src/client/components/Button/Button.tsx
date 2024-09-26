import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Button.module.pcss';
import Icon from '../Icon';
import Text from '../Text';

type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  category: string;
  content: React.ReactNode;
  onClick?: (event: React.SyntheticEvent) => void;
};

const Button = (props: ButtonProps): React.ReactElement => {
  const {
    category,
    type,
    content,
    onClick
  } = props;

  const handleClick = (event: React.SyntheticEvent): void => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={clsx(
        styles.container,
        category === 'buttonText' && styles.containerText,
        category === 'buttonCircle' && styles.containerCircle
      )}
      type={type}
      onClick={handleClick}
    >
      <div>
        {category === 'buttonCircle' ? (
          <Icon id={content.id} viewBox="0 0 40 40" width={40} height={40} />
        ) : (
          <Text content={content} />
        )}
      </div>
    </button>
  );
};

export default Button;
