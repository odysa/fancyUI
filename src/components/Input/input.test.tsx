/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-14 15:08:23
 * @Last Modified by:   Chengxu Bian
 * @Last Modified time: 2020-07-14 15:08:23
 */
import React from "react";
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  wait,
} from "@testing-library/react";
import Input, { InputProps } from "./input";

const props: InputProps = {
  onChange: jest.fn(),
  placeholder: "test",
};

describe("Input", () => {
  it("Default Input", () => {
    const wrapper = render(<Input {...props} />);
    const inputElement = wrapper.getByPlaceholderText(
      "test"
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("fancy-input-inner");
    fireEvent.change(inputElement, { target: { value: "React is the best" } });
    expect(props.onChange).toHaveBeenCalled();
    expect(inputElement.value).toEqual("React is the best");
  });

  it("Input with different size", () => {
    const wrapper = render(<Input size="lg" placeholder="lg test" />);
    const container = wrapper.container.querySelector(".fancy-input-wrapper");
    expect(container).toHaveClass("input-size-lg");
  });

  it("Input with prefix and suffix", () => {
    const wrapper = render(
      <Input placeholder="pend" addonBefore="http://" addonAfter=".com" />
    );
    const container = wrapper.container.querySelector(".fancy-input-wrapper");
    expect(container).toHaveClass("input-group");
    expect(wrapper.queryByText("http://")).toBeInTheDocument();
    expect(wrapper.queryByText(".com")).toBeInTheDocument();
  });

  it("Disabled Input", () => {
    const wrapper = render(<Input disabled placeholder="test" />);
    const inputElement = wrapper.getByPlaceholderText(
      "test"
    ) as HTMLInputElement;
    expect(inputElement.disabled).toBeTruthy();
  });
});
