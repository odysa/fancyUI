/*
 * @Author: Chengxu Bian
 * @Date: 2020-07-06 22:44:11
 * @Last Modified by:   Chengxu Bian
 * @Last Modified time: 2020-07-06 22:44:11
 */

import React from "react";

import { render, cleanup } from "@testing-library/react";

import Button from "./button";

describe("test button component", () => {
  beforeEach(()=>{
    cleanup();
  })
  it("should render the correct default button", () => {
    const button = render(<Button>Default</Button>);
    const element = button.getByText("Default");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("fancy-btn fancy-btn-default");
  });
  it("should render the correct component based on different props", () => {
    const button = render(<Button btnType="danger" size="lg">Danger</Button>);
    const element  = button.getByText("Danger");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass('fancy-btn fancy-btn-danger fancy-btn-lg');
  });
  it("should render disabled button when disabled", () => {
    const button = render(<Button btnType="danger" size="lg" disabled>Danger</Button>);
    const element  = button.getByText("Danger");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass('fancy-btn fancy-btn-danger fancy-btn-lg disabled');
  });
});
