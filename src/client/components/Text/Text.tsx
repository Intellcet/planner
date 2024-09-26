import React, { ReactElement } from 'react';
import styles from './Text.module.pcss';

type TextProps = {
  content: string;
};

const Text = (props: TextProps): React.ReactElement => {
  const { content } = props;
  return <div className={styles.content}>{content}</div>;
};

export default Text;
