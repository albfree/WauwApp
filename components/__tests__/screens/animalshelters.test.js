import React from 'react';
import renderer from 'react-test-renderer';
import AnimalShelters from '../../screens/AnimalShelters';
import mockStore from 'redux-mock-store';

describe('<AnimalShelters />', () => {
  it('testing the AnimalShelters screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn(), params: 10},
    });
    const tree = renderer.create(<AnimalShelters navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});