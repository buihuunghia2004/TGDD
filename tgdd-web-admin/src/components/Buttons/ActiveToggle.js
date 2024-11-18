import { Button } from "antd";
import { useState } from "react";

const ActiveToggle = ({isActive}) => {
  const [active, setActive] = useState(isActive);
  return (
    <Button type="primary" danger={!active} onClick={() => setActive(!active)}>
      {active ? "Hoạt động" : "Không hoạt động"}
    </Button>
  )
}

export default ActiveToggle