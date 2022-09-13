import { Input } from "antd";
import { MouseEventHandler } from "react";
import "./Challenge_Lookup.less";

const { Search } = Input;
export type ChallengeLookupProps = {
    size?: ChallengeLookupSize,
    icon?: JSX.Element,
    onSearchClick?: (value: string) => void;
}

export enum ChallengeLookupSize {
    Small = 'small',
    Medium = "medium",
    Large = "Large"
}

export const ChallengeLookup: React.FC<ChallengeLookupProps> = (props: ChallengeLookupProps): JSX.Element => {
    return (<Search onSearch={props.onSearchClick} size="large" autoFocus={true} />)
}