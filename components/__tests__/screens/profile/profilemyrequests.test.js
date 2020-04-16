import React from 'react';
import renderer from 'react-test-renderer';
import ProfileMyRequests from '../../../screens/Profile/ProfileMyRequests';
import mockStore from 'redux-mock-store';

describe('<ProfileMyRequests />', () => {
  it.skip('testing the ProfileMyRequests screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<ProfileMyRequests navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});