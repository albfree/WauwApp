import React from 'react';
import renderer from 'react-test-renderer';
import DashboardScreen from '../../screens/DashboardScreen';
import mockStore from 'redux-mock-store';

describe('<DashboardScreen />', () => {
  it('testing the DashboardScreen screen', async () => {
    const store = mockStore({
        rehydrated: false,
        navigation: {navigate: jest.fn(), params: 10},
    });
    const tree = renderer.create(<DashboardScreen navigation={store}/>).toJSON();
    expect(tree.children.length).toBe(1);
  });
});