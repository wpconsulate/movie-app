// __tests__/Search-test.js
//When you run yarn test or jest, this will produce an output file
import React from 'react';
import Intro from '../Search';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});
