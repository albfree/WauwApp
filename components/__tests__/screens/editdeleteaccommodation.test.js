import React from "react";
import renderer from "react-test-renderer";
import EditDeleteAccommodation from "../../screens/EditDeleteAccommodation";
import mockStore from "redux-mock-store";

describe("<EditDeleteAccommodation />", () => {
  it.skip("testing the EditDeleteAccommodation screen", async () => {
    const store = mockStore({
      rehydrated: false,
      navigation: { navigate: jest.fn(), params: 10 },
    });
    const tree = renderer
      .create(<EditDeleteAccommodation navigation={store} />)
      .toJSON();
    expect(tree.children.length).toBe(1);
  });
});
