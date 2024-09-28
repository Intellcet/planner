import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Button.module.pcss';
import Icon from '../Icon';
import Text from '../Text';

type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  category: 'buttonText' | 'buttonCircle';
  content: React.ReactNode;
  viewBox?: string;
  width?: number;
  height?: number;
  onClick?: (event: React.SyntheticEvent) => void;
};

const Button = (props: ButtonProps): React.ReactElement => {
  const { category, type, content, viewBox, width, height, onClick } = props;

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
          <Icon
            id={content.id}
            viewBox={viewBox}
            width={width}
            height={height}
          />
        ) : (
          <Text content={content} />
        )}
      </div>
    </button>
  );
};

export default Button;
