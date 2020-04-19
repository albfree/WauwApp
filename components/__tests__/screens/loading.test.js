import React from "react";
import renderer from "react-test-renderer";
import LoadingScreen from "../../screens/LoadingScreen";
import mockStore from "redux-mock-store";

describe("<LoadingScreen />", () => {
  it("testing the LoadingScreen screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn(), params: 10 },
    });
    const tree = renderer.create(<LoadingScreen navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
