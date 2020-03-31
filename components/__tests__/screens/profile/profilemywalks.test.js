import React from 'react';
import renderer from 'react-test-renderer';
//import ProfileMyWalks from '../../../screens/Profile/ProfileMyWalks';
import mockStore from 'redux-mock-store';

describe('<ProfileMyWalks />', () => {
  it.skip('testing the ProfileMyWalks screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<ProfileMyWalks navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});