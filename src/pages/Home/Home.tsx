import { Fragment } from "react";
import "./Home.less";
import { Layout } from "antd";
import { ChallengeList } from "../../Components/Challenge_List/Challenge_List";
import { Challenge } from "../../Components/Challenge_List/Challenge";

export const Home: React.FC<{}> = (props: {}): JSX.Element => {
    let challenges: Challenge[] = [{ title: "hi", description: "hiiii", createdDate: "" }];
    return (<ChallengeList {...{ challenges }}></ChallengeList>)
}