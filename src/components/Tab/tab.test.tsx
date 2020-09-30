import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
} from "@testing-library/react";
import Tabs, { TabProps } from "./tab";
import TabItem from "./tabItem";

const testTabs = (props: TabProps = {}) => {
  return (
    <Tabs {...props}>
      <TabItem label="tab1">mytab1</TabItem>
      <TabItem label="tab2">mytab2</TabItem>
      <TabItem disabled label="tab3">
        mytab3
      </TabItem>
    </Tabs>
  );
};
const myClass = "tab-item";
let wrapper: RenderResult;
let element: HTMLElement;
let activeTab: HTMLElement;
let otherTab: HTMLElement;
let disabledTab: HTMLElement;
let content: HTMLElement;

let testProps: TabProps = {
  onSelect: jest.fn(),
};

describe("Tabs and TabItems", () => {
  beforeEach(() => {
    wrapper = render(testTabs(testProps));
    element = wrapper.getByTestId("tab-test");
    activeTab = wrapper.getByText("tab1");
    otherTab = wrapper.getByText("tab2");
    disabledTab = wrapper.getByText("tab3");
    content = wrapper.getByTestId("tab-content-test");
  });
  it("Default Tab", () => {
    expect(element).toBeInTheDocument();
    expect(activeTab).toHaveClass("is-activated");
    expect(otherTab).toHaveClass(myClass);
    expect(otherTab).not.toHaveClass("is-activated");
    expect(disabledTab).toHaveClass("tab-item tab-title is-disabled");
    expect(content).toHaveTextContent("tab1");
  });

  it("Check onclose after clicking", () => {
    fireEvent.click(otherTab);

    expect(otherTab).toHaveClass("is-activated");
    expect(activeTab).not.toHaveClass("is-activated");
    expect(content).toHaveTextContent("tab2");
    expect(testProps.onSelect).toHaveBeenCalledWith(1);
  });
});
