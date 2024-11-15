import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import Home from '~/pages/Home';
import Detail from '~/pages/Detail';
import SideBarItem from '~/components/SideBarItem';

const cx = classNames.bind(styles);

const SideBar = () => {
  return (
    <aside className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('list')}>
          <SideBarItem title="Home" />
          <SideBarItem title="About" />
        </div>
      </div>

      <footer className={cx('footer')}>
        
      </footer>
    </aside>
  );
};

export default SideBar;
