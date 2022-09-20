import Lottie, { useLottie } from "lottie-react";
import React from "react"
import "./Spinner.less";
import Nyancat from "../../../Assets/Lotties/nyan-cat.json";
export type SpinnerProps = {
    show: boolean;
};

export const Spinner: React.FC<SpinnerProps> = (props: SpinnerProps): JSX.Element => {
    return <div hidden={!props.show} className="spinner spinner__fullscreen spinner__transparent">
        <Lottie animationData={Nyancat} style={{ height: '100%', width: '100%' }} />
    </div>
} 