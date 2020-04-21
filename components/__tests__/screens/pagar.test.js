import React from "react";
import renderer from "react-test-renderer";
import Pagar from "../../screens/Pagar";
import mockStore from "redux-mock-store";

describe("<Pagar />", () => {
  it.skip("testing the payment view", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer
      .create(<Pagar navigation={store} request={store} />)
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});
