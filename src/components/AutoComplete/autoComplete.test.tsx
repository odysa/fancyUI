import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  wait,
  cleanup,
} from "@testing-library/react";

import { AutoComplete, AutoCompleteProps } from "./autoComplete";

const mockDataArray = new Array(20)
  .fill("")
  .map((item, index) => ({ login: index }));

const mockObjectArray = [
  { value: "1", number: 1 },
  { value: "12", number: 12 },
  { value: "3", number: 3 },
  { value: "23", number: 23 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return mockObjectArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete-test",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe("AutoComplete", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete-test"
    ) as HTMLInputElement;
  });

  it("default", async () => {
    fireEvent.change(inputNode, { target: { value: "1" } });
    await wait(() => {
      expect(wrapper.queryByText("12")).toBeInTheDocument();
    });
    const suggestionsLength = wrapper.container.querySelectorAll(
      ".fancy-suggestion-item"
    ).length;

    expect(suggestionsLength).toBe(2);
    fireEvent.click(wrapper.getByText("12"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "12",
      number: 12,
    });
    expect(wrapper.queryByText("3")).not.toBeInTheDocument();
    expect(inputNode.value).toBe("12");
  });

  it("keyboard", async () => {
    fireEvent.change(inputNode, { target: { value: "2" } });
    await wait(() => {
      expect(wrapper.getByText("23")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("12");
    const secondResult = wrapper.queryByText("23");
    const highligtedClass = "item-highlighted";

    //down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass(highligtedClass);
    expect(secondResult).not.toHaveClass(highligtedClass);

    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).not.toHaveClass(highligtedClass);
    expect(secondResult).toHaveClass(highligtedClass);

    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass(highligtedClass);
    expect(secondResult).not.toHaveClass(highligtedClass);

    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "12",
      number: 12,
    });
    expect(firstResult).not.toBeInTheDocument();
  });

  it("dropdown close after click outside", async () => {
    fireEvent.change(inputNode, { target: { value: "3" } });
    await wait(() => {
      expect(wrapper.queryByText("3")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("3")).not.toBeInTheDocument();
  });

  it("async", async () => {
    cleanup();
    const fetch1 = (url: string) => {
      return Promise.resolve({ items: mockDataArray });
    };
    const testProps: AutoCompleteProps = {
      fetchSuggestions: (query: string) => {
        return fetch1("" + query).then(({ items }) => {
          return items.map((item: any) => ({ value: item.login }));
        });
      },
      onSelect: jest.fn(),
      placeholder: "test",
    };
    const wrapper = render(<AutoComplete {...testProps} />);
    const inputNode = wrapper.getByPlaceholderText(
      "test"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "1" } });
    await wait(() => {
      expect(
        wrapper.container.querySelectorAll(".fancy-suggestion-item").length
      ).toBe(20);
    });
  }, 10000);
});
