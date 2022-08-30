import { Avatar, List } from "antd";
import Item from "antd/lib/list/Item";
import { useEffect } from "react";
import { Challenge } from "./Challenge";
import "./Challenge_List.less";

type ChallengeListProps = {
    challenges: Challenge[]
}

export const ChallengeList: React.FC<ChallengeListProps> = (props: ChallengeListProps): JSX.Element => {
    return (<List itemLayout="horizontal" dataSource={props.challenges} renderItem={item =>
        <List.Item>
            <List.Item.Meta avatar={<Avatar src="https://img-9gag-fun.9cache.com/photo/azjWpnm_460s.jpg" />} title={item.title} description={item.description} />
        </List.Item>
    }></List>)
}

