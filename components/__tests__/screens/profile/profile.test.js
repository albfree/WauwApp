import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../../../screens/Profile/Profile';
import mockStore from 'redux-mock-store';

describe('<Profile />', () => {
  it.skip('testing the Profile screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<Profile navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});