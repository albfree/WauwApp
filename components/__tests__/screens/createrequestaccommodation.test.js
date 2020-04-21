import React from "react";
import renderer from "react-test-renderer";
import CreateRequestAccommodation from "../../screens/CreateRequestAccommodation";
import mockStore from "redux-mock-store";

describe("<CreateRequestAccommodation />", () => {
  it.skip("testing the CreateRequestAccommodation screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<CreateRequestAccommodation navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});