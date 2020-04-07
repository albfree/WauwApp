import React from 'react';
import renderer from 'react-test-renderer';
import ShowRequest from '../../../screens/Profile/ShowRequest';
import mockStore from 'redux-mock-store';

describe('<ShowRequest />', () => {
  it.skip('testing the ShowRequest screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<ShowRequest navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});