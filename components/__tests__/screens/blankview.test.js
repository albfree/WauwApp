import React from "react";
import renderer from "react-test-renderer";
import BlankView from "../../screens/BlankView";
import mockStore from "redux-mock-store";

describe("<BlankView />", () => {
  it("testing the BlankView screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<BlankView navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});