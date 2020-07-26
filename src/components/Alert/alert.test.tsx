import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Alert from "./index";

describe("test alert component", () => {
  beforeEach(() => {
    cleanup();
  });
  it("test default alert", () => {
    const wrapper = render(<Alert messgae="default" />);
    const element = wrapper.getByTestId("alert-test");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("fancy-alert alert-info");
  });
  it("test success alert", () => {
    const wrapper = render(<Alert messgae="success" type="success" />);
    const element = wrapper.getByTestId("alert-test");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("fancy-alert alert-success");
  });
  it("test closable alert", () => {
    const wrapper = render(<Alert messgae="success" />);
    const element = wrapper.getByTestId("alert-test");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("fancy-alert alert-info");
    const icon = wrapper.getByTestId("icon-test");
    expect(icon).toBeInTheDocument();
    //if click, should not be visible
    fireEvent.click(icon);
    expect(element).toHaveClass("is-not-visible");
  });
});
