import { Button } from "antd";

export type ShowMoreButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export const ShowMoreButtonComponent: React.FC<ShowMoreButtonProps> = (
  props: ShowMoreButtonProps
): JSX.Element => {
  return (
    <Button
      disabled={props.disabled}
      onClick={props.onClick}
      type="primary"
      style={{ width: "100%" }}
    >
      See more, improve more!
    </Button>
  );
};
