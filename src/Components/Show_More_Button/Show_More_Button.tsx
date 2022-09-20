import { Button } from "antd";

export type ShowMoreButtonProps = {
    onClick?: () => void;
}

export const ShowMoreButton: React.FC<ShowMoreButtonProps> = (props: ShowMoreButtonProps): JSX.Element => {
    return <Button onClick={props.onClick} type="primary" style={{ width: "100%" }}>See more, improve more!</Button>
}