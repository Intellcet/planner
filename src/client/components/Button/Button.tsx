import React from 'react';
import styles from './Button.module.pcss';

type ButtonProps = {
  title: string;
};

const Button = (props: ButtonProps): React.ReactElement => {
  const { title } = props;
  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default Button;
