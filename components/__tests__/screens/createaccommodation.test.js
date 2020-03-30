import React from 'react';
import renderer from 'react-test-renderer';
import CreateAccommodation from '../../screens/CreateAccommodation';
import mockStore from 'redux-mock-store';

describe('<CreateAccommodation />', () => {
  it('testing the CreateAccommodation screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn(), params: 10},
    });
    const tree = renderer.create(<CreateAccommodation navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});