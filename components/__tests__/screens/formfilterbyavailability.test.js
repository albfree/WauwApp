import React from "react";
import renderer from "react-test-renderer";
import FormFilterByAvailability from "../../screens/FormFilterByAvailability";
import mockStore from "redux-mock-store";

describe("<FormFilterByAvailability />", () => {
  it.skip("testing the FormFilterByAvailability screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<FormFilterByAvailability navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});