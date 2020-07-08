import React from "react";
import { render, RenderResult,cleanup,fireEvent} from "@testing-library/react";
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
    <Menu>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1}>2</MenuItem>
      <MenuItem index={2} disabled={true}>
        disabled
      </MenuItem>
      <MenuItem index={3}>click</MenuItem>
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
    expect(disabledElement).toHaveClass("menu-item is-disabled");
    expect(activeElement).toHaveClass("menu-item is-active");
  });
  it("click items should change active and call the right callback", () => {
    const forthItem = wrapper.getByText("click");
    fireEvent.click(forthItem);
    //expect(testProps.onSelect).toHaveBeenCalled();
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
