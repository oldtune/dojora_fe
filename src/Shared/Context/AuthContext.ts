import { createContext } from "react";
import { User } from "../Models/User";

export type AuthContextState = {
    user: User,
    setUser: any
};
export const AuthContext = createContext<AuthContextState>({} as AuthContextState);