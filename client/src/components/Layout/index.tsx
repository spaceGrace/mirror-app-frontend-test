import React from "react";
import { Layout } from "antd";
import Settings from "../Settings";
import LayoutController from "../LayoutController";

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <main
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
    >
      <Layout style={{height: '100%'}}>
        <Sider style={{padding: '16px'}} trigger={null}><Settings /></Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              maxHeight: '100%',
              overflowY: 'scroll',
            }}
          >
            <LayoutController />
          </Content>
        </Layout>
      </Layout>
    </main>
  );
};

export default MainLayout;
