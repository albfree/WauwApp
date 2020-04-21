import React from "react";
import renderer from "react-test-renderer";
import TermsAndConditions from "../../screens/TermsAndConditions";
import mockStore from "redux-mock-store";

describe("<TermsAndConditions />", () => {
  it("testing the TermsAndConditions screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn() },
    });
    const tree = renderer.create(<TermsAndConditions navigation={store} />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});