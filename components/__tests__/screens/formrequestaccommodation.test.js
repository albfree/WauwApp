import React from 'react';
import renderer from 'react-test-renderer';
import FormRequestAccommodation from '../../screens/FormRequestAccommodation';
import mockStore from 'redux-mock-store';

describe('<FormRequestAccommodation />', () => {
  it.skip('testing the FormRequestAccommodation screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<FormRequestAccommodation navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});