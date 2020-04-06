import React from 'react';
import renderer from 'react-test-renderer';
import Pago from '../../screens/Pago';
import mockStore from 'redux-mock-store';

describe('<Pago />', () => {
  it.skip('testing the payment view', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn()},
    });
    const tree = renderer.create(<Pago navigation={store} request={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});