import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Challenge } from "../../Components/Challenge_List/Challenge";
import { ChallengeList } from "../../Components/Challenge_List/Challenge_List";
import { ChallengeLookup, ChallengeLookupSize } from "../../Components/Challenge_Lookup/Challenge_Lookup";
import { ShowMoreButton } from "../../Components/Show_More_Button/Show_More_Button";
import { ChallengeService } from "../../Services/Challenge.service";
import { createDefaultFilter, createDefaultPaging } from "../../Shared/Misc/Paging";
import "./Home.less";

export const Home: React.FC<{}> = (props: {}): JSX.Element => {
    let [challenges, setChallenges] = useState([] as Challenge[]);
    let [filter, setFilter] = useState(createDefaultFilter);

    useEffect(() => {
        ChallengeService.getList(filter).subscribe((data) => {
            setChallenges(data);
        });
    }, [filter]);

    const searchButtonHandler: (value: string) => void = (value: string) => {
        setFilter({ ...filter, keyword: value });
    };

    const showMoreBtnClickHandler = () => {
        setFilter({ ...filter, pageIndex: filter.pageIndex + 1 })
    }

    return (
        <Row>
            <Col md={{ span: 16, offset: 4 }} span={22} offset={1}>
                <ChallengeLookup
                    onSearchClick={searchButtonHandler}
                    size={ChallengeLookupSize.Medium}
                />
                <ChallengeList {...{ challenges }} />
                <ShowMoreButton onClick={showMoreBtnClickHandler} />
            </Col>
        </Row>
    );
};
