// __tests__/Register-test.js
//When you run yarn test or jest, this will produce an output file
import React from 'react';
import Intro from '../Register';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Register />).toJSON();
  expect(tree).toMatchSnapshot();
});
