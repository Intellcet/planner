import React from 'react';
import { hot } from 'react-hot-loader/root';

import '../../styles/common.pcss';
import '../../styles/fonts.pcss';
import '../../styles/variables.pcss';

import Task from '../Task';
import Button from '../Button';

import ClockSVG from '../../assets/clock.svg';

const App = (): React.ReactElement => {
  return (
    <div>
      <Button type="buttonCircle" content={ClockSVG} />
      <Button type="buttonText" content="ClockSVG" />
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
