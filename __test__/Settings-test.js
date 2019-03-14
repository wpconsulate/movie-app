// __tests__/Settings-test.js
// When you run yarn test or jest, this will produce an output file
import React from 'react';
import Intro from '../Settings';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});
