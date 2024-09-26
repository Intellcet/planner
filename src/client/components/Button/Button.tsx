import React, { ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Button.module.pcss';
import Icon from '../Icon';
import Text from '../Text';

type ButtonProps = {
  type: string;
  content: React.ReactElement | string;
};

const Button = (props: ButtonProps): React.ReactElement => {
  const { type, content } = props;
  return (
    <button
      className={clsx(styles.container, {
        [styles.containerText]: type === 'buttonText',
        [styles.containerCircle]: type === 'buttonCircle',
      })}
    >
      <div>
        {type === 'buttonCircle' ? (
          <Icon id={content.id} viewBox="0 0 41 40" width={41} height={40} />
        ) : (
          <Text content={content} />
        )}
      </div>
    </button>
  );
};

export default Button;
