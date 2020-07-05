import React from "react";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Small}
          href={"www.baidu.com"}
        >
          Link Test
        </Button>
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
        >
          Large Button
        </Button>
      </header>
    </div>
  );
}

export default App;
