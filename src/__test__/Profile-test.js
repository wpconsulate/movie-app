// __tests__/Profile-test.js
//When you run yarn test or jest, this will produce an output file
import React from 'react';
import Intro from '../Profile';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});
