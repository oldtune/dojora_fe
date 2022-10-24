import { Observable } from "rxjs";
import {
  Challenge,
  ChallengeResponse,
  NewChallenge,
} from "../Components/Challenge";
import { Filter } from "../Shared/Models/BasePagingModel";
import { Http } from "./Http";

export const ChallengeService = {
  getList: function (filter: Filter): Observable<ChallengeResponse[]> {
    return Http.get<ChallengeResponse[]>("challenges", filter);
  },
  addNew: function (challenge: NewChallenge): Observable<{}> {
    return Http.post("challenges", challenge);
  },
  archiveChallenge(id: string): Observable<{}> {
    return Http.post("challenges/archive", id);
  },
  detail: function (id: string): Observable<Challenge> {
    return Http.get(`challenges/${id}`);
  },
};
