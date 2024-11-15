import classNames from "classnames/bind"
import styles from "./SideBarItem.module.scss"

const cx = classNames.bind(styles);

const SideBarItem = ({title}) => {
  return <div className={cx("wrapper")}>
    <p className={cx("title")}>{title}</p>
  </div>
}

export default SideBarItem