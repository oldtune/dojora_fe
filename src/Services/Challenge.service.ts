import { Observable } from "rxjs";
import {
  Challenge,
  ChallengeResponse,
  NewChallenge,
} from "../Components/Challenge";
import { Filter } from "../Shared/Models/BasePagingModel";
import { HttpService } from "./Http.service";

export const ChallengeService = {
  getList: function (filter: Filter): Observable<ChallengeResponse[]> {
    return HttpService.get<ChallengeResponse[]>("challenges", filter);
  },
  addNew: function (challenge: NewChallenge): Observable<{}> {
    return HttpService.post("challenge", challenge);
  },
  archiveChallenge(id: string): Observable<{}> {
    return HttpService.post("challenge/archive", id);
  },
  detail: function (id: string): Observable<Challenge> {
    return HttpService.get(`challenge/${id}`);
  },
};
