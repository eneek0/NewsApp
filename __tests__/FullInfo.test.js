import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import FullItem from "../components/FullInfo";

const mockRoute = {
  params: {
    img: "https://example.com/image.jpg",
    name: "Test Item",
    full: "This is a full description of the test item.",
  },
};

describe("FullItem", () => {
  it("renders correctly with given props", () => {
    const { getByText, getByTestId } = render(<FullItem route={mockRoute} />);

    expect(getByText("Test Item")).toBeTruthy();
    expect(
      getByText("This is a full description of the test item.")
    ).toBeTruthy();
    waitFor(() =>
      expect(getByTestId("publish-time")).toHaveTextContent(/Published on: .*/)
    );
    expect(getByTestId("image")).toBeTruthy();
    expect(getByText("Shares: 0")).toBeTruthy();
  });

  it('increments share count on "Share" button press', () => {
    const { getByText, getByRole } = render(<FullItem route={mockRoute} />);

    const shareButton = getByRole("button", { name: /share/i });

    fireEvent.press(shareButton);

    expect(getByText("Shares: 1")).toBeTruthy();

    fireEvent.press(shareButton);

    expect(getByText("Shares: 2")).toBeTruthy();
  });
});
