/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-06 22:44:11
 * @Last Modified by:   Chengxu Bian
 * @Last Modified time: 2020-07-06 22:44:11
 */

import React from "react";

import { render } from "@testing-library/react";

import Button from "./button";

test("", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.getByText("Nice");
  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual("BUTTON");
  expect(element).toHaveClass("fancy-btn fancy-btn-default");
});

describe("test button component", () => {
  it("should render the correct default button", () => {});
  it("should render the correct component based on different props", () => {});
  it("should render disabled button when disabled", () => {});
});
