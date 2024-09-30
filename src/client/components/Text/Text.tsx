import React from 'react';
import styles from './Text.module.pcss';

type TextProps = {
  content: React.ReactNode;
};

const Text = (props: TextProps): React.ReactElement => {
  const { content } = props;
  return <span className={styles.content}>{content}</span>;
};

export default Text;
