import classNames from "classnames/bind"
import styles from "./Login.module.scss"
import { useState } from "react";
import axiosInstance from "~/config/axiosInstance";

const cx = classNames.bind(styles);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (username, password) => {
    axiosInstance.post('/auth/login', {
      username,
      password
    })
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <p>Đăng nhập</p>
        <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Tài khoản" />
        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
        <button onClick={()=>handleLogin(username, password)}>Đăng nhập</button>
      </div>
    </div>
  )
}

export default Login