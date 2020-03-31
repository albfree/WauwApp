import React from 'react';
import renderer from 'react-test-renderer';
import Chats from '../../screens/Chats';
import mockStore from 'redux-mock-store';

describe('<Chats />', () => {
  it('testing the Chats screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn(), params: 10},
    });
    const tree = renderer.create(<Chats navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});