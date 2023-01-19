import { Http, HttpResult } from "../../../Services/Http";
import { User } from "../User";

export const UserService = {
    async Login(user: User): Promise<HttpResult<LoginResult>> {
        const response = await Http.post<LoginResult>("auth/login", user);
        return response;
    },
};

export type LoginResult = {
    success: boolean,
    errors: string[]
};
