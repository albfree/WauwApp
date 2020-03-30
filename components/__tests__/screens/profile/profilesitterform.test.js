import React from 'react';
import renderer from 'react-test-renderer';
import ProfileSitterForm from '../../../screens/Profile/ProfileSitterForm';
import mockStore from 'redux-mock-store';

describe('<ProfileSitterForm />', () => {
  it('testing the ProfileSitterForm screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<ProfileSitterForm navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});