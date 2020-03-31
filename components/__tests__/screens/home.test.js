import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../screens/Home';
import mockStore from 'redux-mock-store';

describe('<Home />', () => {
  it('testing the home screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<Home navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});