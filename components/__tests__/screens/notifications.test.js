import React from 'react';
import renderer from 'react-test-renderer';
import Notifications from '../../screens/Notifications';
import mockStore from 'redux-mock-store';

describe('<Notifications />', () => {
  it('testing the Notifications screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn(), params: 10},
    });
    const tree = renderer.create(<Notifications navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});