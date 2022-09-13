import { stringify } from "querystring";

export function ThreeDotIfTooLong(content: string, threshold: number): string{
    if (content.length == 0) {
        return content;
    }
    if (content.length > threshold) {
        return `${content.substring(0, threshold)}...`;
    }
    return content;
}