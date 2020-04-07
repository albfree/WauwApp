import React from 'react';
import renderer from 'react-test-renderer';
import SearchAccommodations from '../../screens/SearchAccommodations';
import mockStore from 'redux-mock-store';

describe('<SearchAccommodations />', () => {
  it('testing the search accommodation screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<SearchAccommodations navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});