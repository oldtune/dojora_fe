import { Input, InputRef } from "antd";
import { useRef } from "react";
import "./Challenge_Lookup.less";

const { Search } = Input;
export type ChallengeLookupProps = {
  size?: ChallengeLookupSize;
  icon?: JSX.Element;
  onSearchClick?: (value: string) => void;
};

export enum ChallengeLookupSize {
  Small = "small",
  Medium = "medium",
  Large = "Large",
}

export const ChallengeLookupComponent: React.FC<ChallengeLookupProps> = (
  props: ChallengeLookupProps
): JSX.Element => {
  const searchBar = useRef<InputRef>(null);
  const onEnterPressed = () => {
    if (searchBar.current && searchBar.current.input && props.onSearchClick) {
      props.onSearchClick(searchBar.current.input.value);
    }
  };

  return (
    <Search
      ref={searchBar}
      onPressEnter={onEnterPressed}
      onSearch={props.onSearchClick}
      size="large"
      autoFocus={true}
    />
  );
};
