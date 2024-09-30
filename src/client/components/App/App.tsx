import React from 'react';
import { hot } from 'react-hot-loader/root';

import '../../styles/common.pcss';
import '../../styles/fonts.pcss';
import '../../styles/variables.pcss';

import Task from '../Task';
import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';

import ClockSVG from '../../assets/clock.svg';

const ExampleAction = () => {
  console.log(ClockSVG.width);
};

const App = (): React.ReactElement => {
  return (
    <div>
      <Button
        category="buttonCircle"
        type="button"
        content={
          <Icon
            id={ClockSVG.id}
            viewBox={ClockSVG.viewBox}
            width={40}
            height={40}
          />
        }
        onClick={ExampleAction}
      >
        <Text content="Какой то текст" />
      </Button>
      <Button category="buttonText" type="button" onClick={ExampleAction}>
        <Text content="ClockSVG" />
      </Button>
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
