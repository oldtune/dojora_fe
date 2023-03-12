import { Http, HttpResult } from "../../../Services/Http";
import { User } from "../User";

export const UserService = {
    async Login(user: User): Promise<HttpResult<string>> {
        const response = await Http.post<string>("auth/login", user);
        return response;
    },
    async Register(user: User): Promise<HttpResult<string>> {
        const response = await Http.post<string>("auth/register", user);
        return response;
    }
};

// export type LoginResult = {
//     success: boolean,
//     errors: string[]
// };
