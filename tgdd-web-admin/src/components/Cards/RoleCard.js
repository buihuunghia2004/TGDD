import { RoleInfo } from "~/contstants/roleConstants";

const { Tag } = require("antd");

const RoleCard = ({role}) => {
  return <Tag color="red">{RoleInfo[role]?.name || "xxx"}</Tag>;
};

export default RoleCard;