import { useEffect } from "react";
import "./Home.less";
import { Challenge } from "../../components/Challenge_List/Challenge";
import { ChallengeList } from "../../components/Challenge_List/Challenge_List";
import { ChallengeService } from "../../Services/Challenge.service";

export const Home: React.FC<{}> = (props: {}): JSX.Element => {
    let challenges: Challenge[] = [];
    useEffect(() => {
        ChallengeService.getList().subscribe(data => { console.log(data) });
    });
    return (<ChallengeList {...{ challenges }}></ChallengeList>)
}