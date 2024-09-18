import React from 'react';
import { hot } from 'react-hot-loader/root';
import Task from '../Task';

import '../../styles/common.pcss';
import '../../styles/fonts.pcss';
import '../../styles/variables.pcss';

const App = (): React.ReactElement => {
  return (
    <div>
      <Task
        id={1}
        date="20.12.2007"
        title="Обосрать Даню"
        description="Значится приходит и срем какулями на Даню с неебейшим кайфом"
      />
    </div>
  );
};

export default hot(App);
