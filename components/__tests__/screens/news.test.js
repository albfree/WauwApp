import React from "react";
import renderer from "react-test-renderer";
import News from "../../screens/News";
import mockStore from "redux-mock-store";

describe("<News />", () => {
  it("testing the News screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<News navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});