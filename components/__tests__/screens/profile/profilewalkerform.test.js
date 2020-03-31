import React from 'react';
import renderer from 'react-test-renderer';
import ProfileWalkerForm from '../../../screens/Profile/ProfileWalkerForm';
import mockStore from 'redux-mock-store';

describe('<ProfileWalkerForm />', () => {
  it('testing the ProfileWalkerForm screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<ProfileWalkerForm navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});