import React from "react";
import { render } from "react-native-testing-library";
import LoginScreen from "../../screens/LoginScreen";

describe("<LoginScreen />", () => {
  it.skip("testing the whole LoginScreen with a snapshot", () => {
    const result = render(<LoginScreen />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
