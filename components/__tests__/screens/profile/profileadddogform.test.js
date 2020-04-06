import React from 'react';
import renderer from 'react-test-renderer';
import ProfileAddDogForm from '../../../screens/Profile/ProfileAddDogForm';
import mockStore from 'redux-mock-store';

describe('<ProfileAddDogForm />', () => {
  it('testing the ProfileAddDogForm screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<ProfileAddDogForm navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});