import React from 'react';
import renderer from 'react-test-renderer';
import Services from '../../screens/Services';
import mockStore from 'redux-mock-store';

describe('<Services />', () => {
  it('testing the services screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<Services navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(2);
  });
});