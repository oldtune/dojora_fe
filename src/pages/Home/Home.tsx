import { Fragment } from "react";
import "./Home.scss";
import { Layout } from "antd";

const { Footer, Content } = Layout;

export function Home(props: {}) {
    return (<Layout>
        <Content>Content</Content>
        <Footer>Footer</Footer>
    </Layout>)
}