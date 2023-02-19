import { Environment, Settings } from "../../Services/Settings"

export const dbg = (something: any) => {
    if (Settings.Environment == Environment.Development) {
        if (something) {
            console.log(something);
        }
        else {
            console.log("INSTANCE is null or undefined");
            console.trace();
        }
    }
}