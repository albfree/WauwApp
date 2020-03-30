import React from 'react';
import renderer from 'react-test-renderer';
import ListMyNotifications from '../../screens/ListMyNotifications';
import mockStore from 'redux-mock-store';

describe('<ListMyNotifications />', () => {
  it('testing the ListMyNotifications screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<ListMyNotifications navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});