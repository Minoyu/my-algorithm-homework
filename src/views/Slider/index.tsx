import * as React from 'react';
import { Layout, Menu, Icon, } from 'antd';
import * as style from './style.scss'
import { Link } from 'react-router-dom';
const { Sider, } = Layout;
const SubMenu = Menu.SubMenu;

export default function Slider() {
  const [collapsed, setCollapsed] = React.useState<boolean>(false)
  const onCollapse = (isCollapsed: boolean) => { setCollapsed(isCollapsed); }
  return (
    <Sider
      collapsible={true}
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className={style.logo}>我的算法作业</div>
      <Menu theme="dark" defaultOpenKeys={['sub1']} mode="inline">
        <Menu.Item key="0">
          <Link to="/">
            <Icon type="user" />
            <span>关于</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={<span><Icon type="retweet" /><span>第一周 递归</span></span>}
        >
          <Menu.Item key="1">
            <Link to="/1-1">1. 正整数求和</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/1-2">2. 上台阶走法</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/1-3">3. 整数划分</Link>
          </Menu.Item>
        </SubMenu>

      </Menu>
    </Sider>
  )
}