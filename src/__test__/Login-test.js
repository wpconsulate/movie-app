// __tests__/Login-test.js
//When you run yarn test or jest, this will produce an output file
import React from 'react';
import Intro from '../Login';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
