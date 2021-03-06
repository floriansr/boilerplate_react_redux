import React from 'react';

import { NavLink, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Button } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Cookies from 'js-cookie';

import { removeConnexion, removeProfile } from '../../redux';

const { SubMenu } = Menu;

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logStatus = useSelector((state) => state.log.log);

  const handleClick = (e) => {
    console.log('click', e);
  };

  const deconnexion = () => {
    const token = JSON.parse(Cookies.get('token')).jwt;
    const userStatus = JSON.parse(Cookies.get('token')).status;

    fetch(`https://form-you-back.herokuapp.com/${userStatus}s/sign_out.json`, {
      method: 'delete',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.statusText === 'No Content') {
          dispatch(removeConnexion());
          dispatch(removeProfile());
          Cookies.remove('token');
          history.push('/login');
        } else response.json();
      })
      .catch((error) => console.rror(error));
  };

  return (
    <>
      <div>
        <Menu key="menu1" mode="horizontal" onClick={handleClick} theme="dark">
          <Menu.Item key="4" icon={<AppstoreOutlined />}>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" disabled icon={<AppstoreOutlined />}>
            About
          </Menu.Item>
          <Menu.Item key="6" disabled icon={<MailOutlined />}>
            Contact
          </Menu.Item>

          {logStatus ? (
            <Menu.Item key="7" disabled icon={<SettingOutlined />}>
              Profile
            </Menu.Item>
          ) : (
            <Menu.Item key="8" icon={<UserOutlined />}>
              <NavLink to="/register" activeClassName="active">
                Register
              </NavLink>
            </Menu.Item>
          )}

          {logStatus ? (
            <Menu.Item key="9" disabled icon={<SettingOutlined />}>
              <Button type="button" onClick={deconnexion}>
                Deconnexion
              </Button>
            </Menu.Item>
          ) : (
            <SubMenu
              icon={<UserOutlined />}
              title="Login"
              key="sub1"
              onClick={handleClick}
            >
              <Menu.Item key="1" icon={<AppstoreOutlined />}>
                <Link to="/login/student">Student Space</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<AppstoreOutlined />}>
                <Link to="/login/instructor">Instructor Space</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<AppstoreOutlined />}>
                <Link to="/login/administrator">Admin Space</Link>
              </Menu.Item>
            </SubMenu>
          )}

          <Menu.Item key="10">
            <a
              href="https://ant.design"
              target="_blank"
              rel="noopener noreferrer"
            >
              AntDesign (get quick antdesign access ;) )
            </a>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
