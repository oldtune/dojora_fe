import { User } from "../Models/User";

export const JwtDecode: (_: string) => User = (jwt: string) => {
    let chunks = jwt.split(".");
    if (chunks.length != 3) {
        return {
            username: "",
            id: "",
            authenticated: false
        };
    }


    const claims: User = JSON.parse(atob(chunks[1]));

    return {
        authenticated: true,
        id: claims.id,
        username: claims.username
    };
}