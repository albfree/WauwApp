import React from "react";
import renderer from "react-test-renderer";
import BlankView2 from "../../screens/BlankView2";
import mockStore from "redux-mock-store";

describe("<BlankView2 />", () => {
  it("testing the BlankView2 screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<BlankView2 navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});