import { Button } from "antd";

const ActionURDButton = ({type}) => {
  const text = type === "r" ? "Xem" : type === "u" ? "Sửa" : "Xóa";
  const typeButton = type === "r" ? "default" : "primary";
  return <Button type={typeButton} danger={type === "d"} >{text}</Button>
}
export default ActionURDButton