import React from "react";
import { storiesOf } from "@storybook/react";
import Alert from "./alert";

const defaultAlert = () => {
  return (
    <div>
      <Alert messgae="Unclosable Alert!" type="info" closable={false} />
      <br />
      <Alert messgae="Alert!" type="info" />
      <br />
      <Alert messgae="Alert!" description="It is description" type="info" />
    </div>
  );
};

const themeAlert = () => {
  return (
    <div>
      <Alert messgae="info" type="info" closable={false} />
      <br />
      <Alert messgae="error" type="error" closable={false} />
      <br />
      <Alert messgae="success" type="success" closable={false} />
      <br />
      <Alert messgae="warning" type="warning" closable={false} />
    </div>
  );
};

storiesOf("Alert", module)
  .addParameters({
    info:{
      text:`
      ## Alert Component to display alert messages
      `
    }
  })
  .add("Alert", defaultAlert)
  .add("Alert themes", themeAlert);
