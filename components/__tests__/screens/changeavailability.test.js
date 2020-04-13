import React from 'react';
import renderer from 'react-test-renderer';
import ChangeAvailability from '../../screens/ChangeAvailability';
import mockStore from 'redux-mock-store';

describe('<ChangeAvailability />', () => {
  it('testing the ChangeAvailability screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn(), params: 10},
    });
    const tree = renderer.create(<ChangeAvailability navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});