import React from "react";
import { render } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress", () => {
  it("Progress with text", () => {
    const wrapper = render(<Progress percent={70} showText={true} />);
    const innerBar = wrapper.getByText("70%");

    const outBar = wrapper.container.querySelector(
      ".fancy-progress-bar-outer"
    ) as HTMLElement;

    expect(innerBar).toBeInTheDocument();
    expect(
      wrapper.container.querySelector(".fancy-progress-bar-inner")
    ).toHaveClass("color-primary");
  });

  it("Progress with other props", () => {
    const wrapper = render(<Progress percent={50} theme="info" />);

    const innerBar = wrapper.queryByText("50%");

    const outBar = wrapper.container.querySelector(
      ".fancy-progress-bar-outer"
    ) as HTMLElement;

    expect(innerBar).not.toBeInTheDocument();

    expect(
      wrapper.container.querySelector(".fancy-progress-bar-inner")
    ).toHaveClass("color-info");
  });
});
