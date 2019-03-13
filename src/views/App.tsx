import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Layout, } from 'antd';
const { Header, Content, Footer, } = Layout;
import './base.scss';
import Slider from './Slider';
import About from './Pages/About';
import Page101 from './Pages/1-1';
import Page102 from './Pages/1-2';
import Page103 from './Pages/1-3';

export default function App() {
  return (
    <BrowserRouter>
      <Layout tagName="section" style={{ minHeight: '100vh' }}>
        <Slider />
        <Layout tagName="main">
          <Header tagName="section" style={{ background: '#fff', padding: 0, height: 16 }} />
          <Content tagName="main" style={{ margin: '0 16px' }} >
            <Switch>
              <Route path="/1-1" component={Page101} />
              <Route path="/1-2" component={Page102} />
              <Route path="/1-3" component={Page103} />
              <Route path="/" component={About} />
            </Switch>
            <Footer tagName="footer" style={{ textAlign: 'center' }}>
              Made with <s>Hate</s>Love by MinoYu.
          </Footer>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}