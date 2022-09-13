import React, { useEffect, useState } from "react";
import "./Home.less";
import { Challenge } from "../../components/Challenge_List/Challenge";
import { ChallengeList } from "../../components/Challenge_List/Challenge_List";
import { ChallengeService } from "../../Services/Challenge.service";
import {
  ChallengeLookup,
  ChallengeLookupSize,
} from "../../components/Challenge_Lookup/Challenge_Lookup";
import { Col, Row } from "antd";

export const Home: React.FC<{}> = (props: {}): JSX.Element => {
  let [challenges, setChallenges] = useState([] as Challenge[]);
  let [keyword, setKeyword] = useState("");

  useEffect(() => {
    ChallengeService.getList().subscribe((data) => {
      setChallenges(data);
    });
  }, [keyword]);

  const searchButtonHandler: (value: string) => void = (value: string) => {
    setKeyword(value);
  };

  return (
    <Row>
      <Col md={{ span: 16, offset: 4 }} span={22} offset={1}>
        <ChallengeLookup
          {...{
            onSearchClick: searchButtonHandler,
            size: ChallengeLookupSize.Medium,
          }}
        />
        <ChallengeList {...{ challenges }} />
      </Col>
    </Row>
  );
};
