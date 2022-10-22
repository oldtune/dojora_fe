import { Avatar, List } from "antd";
import { ThreeDotIfTooLong } from "../../helpers/String_helper";
import { Challenge } from "../Challenge";
import "./Challenge_List.less";

type ChallengeListProps = {
  challenges: Challenge[];
};

export const ChallengeListComponent: React.FC<ChallengeListProps> = (
  props: ChallengeListProps
): JSX.Element => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={props.challenges}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src="https://img-9gag-fun.9cache.com/photo/azjWpnm_460s.jpg" />
            }
            title={ThreeDotIfTooLong(item.title, 50)}
            description={ThreeDotIfTooLong(item.description, 100)}
          />
        </List.Item>
      )}
    ></List>
  );
};
