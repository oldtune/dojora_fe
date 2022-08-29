import { List } from "antd";
import { Challenge } from "./Challenge";
import "./Challenge_List.less";

type ChallengeListProps = {
    challenges: Challenge[]
}

export const ChallengeList: React.FC<ChallengeListProps> = (props: ChallengeListProps): JSX.Element => {
    console.log(props);
    return (<List dataSource={props.challenges}></List>)
}

