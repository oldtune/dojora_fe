import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Challenge } from "../../Components/Challenge_List/Challenge";
import { ChallengeList } from "../../Components/Challenge_List/Challenge_List";
import { ChallengeLookup, ChallengeLookupSize } from "../../Components/Challenge_Lookup/Challenge_Lookup";
import { ChallengeService } from "../../Services/Challenge.service";
import { createDefaultFilter, createDefaultPaging } from "../../Shared/Misc/Paging";
import "./Home.less";

export const Home: React.FC<{}> = (props: {}): JSX.Element => {
    let [challenges, setChallenges] = useState([] as Challenge[]);
    let [keyword, setKeyword] = useState("");
    let [filter, setFilter] = useState(createDefaultFilter);
    useEffect(() => {
        ChallengeService.getList(filter).subscribe((data) => {
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
