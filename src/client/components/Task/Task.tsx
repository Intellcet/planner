import React from 'react';
import styles from './Task.module.pcss';

type TaskProps = {
  id: number;
  date: string;
  title: string;
  description: string;
};

const Task = (props: TaskProps): React.ReactElement => {
  const { id, date, title, description } = props;
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span className={styles.taskNumber}>Задача: №{id}</span>
        <span className={styles.date}>Дата: {date}</span>
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default Task;
