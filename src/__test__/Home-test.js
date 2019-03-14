// __tests__/Home-test.js
//When you run yarn test or jest, this will produce an output file
import React from 'react';
import Intro from '../Home';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
