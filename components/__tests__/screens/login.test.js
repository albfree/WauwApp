import React from "react";
import renderer from "react-test-renderer";
import LoginScreen from "../../screens/LoginScreen";
import mockStore from "redux-mock-store";

describe("<LoginScreen />", () => {
  it("testing the LoginScreen screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<LoginScreen navigation={store} />).toJSON();
    expect(tree.children.length).toBe(6);
  });
});