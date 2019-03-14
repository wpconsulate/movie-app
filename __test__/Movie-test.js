// __tests__/Movie-test.js
//When you run yarn test or jest, this will produce an output file
import React from 'react';
import Intro from '../Movie';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Movie />).toJSON();
  expect(tree).toMatchSnapshot();
});
