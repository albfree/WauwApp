import React from "react";
import renderer from "react-test-renderer";
import FormFilterByDate from "../../screens/FormFilterByDate";
import mockStore from "redux-mock-store";

describe("<FormFilterByDate />", () => {
  it("testing the FormFilterByDate screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<FormFilterByDate navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});