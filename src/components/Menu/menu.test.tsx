import React from "react";
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  wait,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerticalProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};
/**
 * Create a menu instance to be test
 * @param props 
 */
const createMenu = (props: MenuProps) => {
  return (
    <Menu onSelect={props.onSelect}>
      <MenuItem>active</MenuItem>
      <MenuItem>2</MenuItem>
      <MenuItem disabled={true}>disabled</MenuItem>
      <MenuItem>click</MenuItem>
      <SubMenu title="Sub">
        <MenuItem>sub1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

/**
 * Add style to memu
 */
const createStyle = () => {
  const cssStyle: string = `
  .fancy-submenu{
    display:none;
  }
  .fancy-submenu.menu-opened{
    display:block;
  }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssStyle;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("", () => {
  beforeEach(() => {
    wrapper = render(createMenu(testProps));
    // inseart style
    wrapper.container.append(createStyle());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("it should render correct menu and menu item on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("fancy-menu");
    // select first layer
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
    expect(disabledElement).toHaveClass("menu-item is-disabled");
    expect(activeElement).toHaveClass("menu-item is-active");
  });
  it("click items should change active and call the right callback", () => {
    const forthItem = wrapper.getByText("click");
    expect(forthItem).not.toHaveClass("is-active");
    // click item
    fireEvent.click(forthItem);
    expect(testProps.onSelect).toHaveBeenCalledWith("3");
    expect(forthItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("2");
  });
  it("should render vertical mode then mode is set to vertical", () => {
    cleanup();
  });
  it("should show drop down when hover", async () => {
    expect(wrapper.queryByText("sub1")).not.toBeVisible();
    const dropDownElement = wrapper.getByText("Sub");
    fireEvent.mouseEnter(dropDownElement);
    // async test
    await wait(() => {
      expect(wrapper.queryByText("sub1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("sub1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("4-0");
  });
});
