import React from "react";
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};

const createMenu = (props: MenuProps) => {
  return (
    <Menu onSelect={props.onSelect}>
      <MenuItem>active</MenuItem>
      <MenuItem>2</MenuItem>
      <MenuItem disabled={true}>disabled</MenuItem>
      <MenuItem>click</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("", () => {
  beforeEach(() => {
    wrapper = render(createMenu(testProps));
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("it should render correct menu and menu item on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("fancy-menu");
    expect(menuElement.getElementsByTagName("li").length).toEqual(4);
    expect(disabledElement).toHaveClass("fancy-menu-item is-disabled");
    expect(activeElement).toHaveClass("fancy-menu-item is-active");
  });
  it("click items should change active and call the right callback", () => {
    const forthItem = wrapper.getByText("click");
    expect(forthItem).not.toHaveClass("is-active");
    fireEvent.click(forthItem);
    expect(testProps.onSelect).toHaveBeenCalledWith(3);
    expect(forthItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(2);
  });
  it("should render vertical mode then mode is set to vertical", () => {
    cleanup();
  });
});
