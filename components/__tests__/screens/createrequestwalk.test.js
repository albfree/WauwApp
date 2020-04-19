import React from "react";
import renderer from "react-test-renderer";
import CreateRequestWalk from "../../screens/CreateRequestWalk";
import mockStore from "redux-mock-store";

describe("<CreateRequestWalk />", () => {
  it.skip("testing the CreateRequestWalk screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer
      .create(<CreateRequestWalk navigation={store} />)
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});
