import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { finalize, tap } from "rxjs";
import { Challenge } from "../../Components/Challenge_List/Challenge";
import { ChallengeList } from "../../Components/Challenge_List/Challenge_List";
import {
  ChallengeLookup,
  ChallengeLookupSize,
} from "../../Components/Challenge_Lookup/Challenge_Lookup";
import { ShowMoreButton } from "../../Components/Show_More_Button/Show_More_Button";
import { ChallengeService } from "../../Services/Challenge.service";
import { Message } from "../../Shared/Misc/Message";
import { createDefaultFilter } from "../../Shared/Misc/Paging";
import "./Home.less";

export const Home: React.FC<{}> = (_): JSX.Element => {
  let [challenges, setChallenges] = useState([] as Challenge[]);
  let [filter, setFilter] = useState(createDefaultFilter);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    let filterSubscription = ChallengeService.getList(filter)
      .pipe(
        tap(() => setLoading(true)),
        finalize(() => setLoading(false))
      )
      .subscribe(
        (data: Challenge[]) => {
          setChallenges(data);
        },
        (_) => {
          Message.error("Failed to load challenges");
        }
      );

    return () => {
      filterSubscription.unsubscribe();
    };
  }, [filter]);

  const searchButtonHandler: (value: string) => void = (value: string) => {
    setFilter({ ...filter, keyword: value, pageIndex: 0 });
  };

  const showMoreBtnClickHandler = () => {
    setFilter({ ...filter, pageIndex: filter.pageIndex + 1 });
  };

  return (
    <Row>
      <Col md={{ span: 16, offset: 4 }} span={22} offset={1}>
        <ChallengeLookup
          onSearchClick={searchButtonHandler}
          size={ChallengeLookupSize.Medium}
        />
        <ChallengeList {...{ challenges }} />
        <Col md={{ span: 8, offset: 8 }}>
          <ShowMoreButton
            disabled={loading}
            onClick={showMoreBtnClickHandler}
          />
        </Col>
      </Col>
    </Row>
  );
};
