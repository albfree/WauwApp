import React from 'react';
import renderer from 'react-test-renderer';
import ProfileMyAccommodations from '../../../screens/Profile/ProfileMyAccommodations';
import mockStore from 'redux-mock-store';

describe('<ProfileMyAccommodations />', () => {
  it('testing the ProfileMyAccommodations screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<ProfileMyAccommodations navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});