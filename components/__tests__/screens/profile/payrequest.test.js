import React from "react";
import renderer from "react-test-renderer";
import PayRequest from "../../../screens/Profile/PayRequest";
import mockStore from "redux-mock-store";

describe("<PayRequest />", () => {
  it.skip("testing the PayRequest screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<PayRequest navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
