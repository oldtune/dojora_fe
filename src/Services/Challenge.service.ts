import { Observable } from "rxjs";
import {
  Challenge,
  ChallengeResponse,
} from "../Components/Challenge_List/Challenge";
import { Filter } from "../Shared/Models/BasePagingModel";
import { HttpService } from "./Http.service";

export const ChallengeService = {
  getList: function (filter: Filter): Observable<ChallengeResponse[]> {
    return HttpService.get<ChallengeResponse[]>("challenges", filter);
  },
  addNew: function (challenge: Challenge): Observable<{}> {
    return HttpService.post("challenge", challenge);
  },
  archiveChallenge(id: string): Observable<{}> {
    return HttpService.post("challenge/archive", id);
  },
  detail: function (id: string): Observable<Challenge> {
    return HttpService.get(`challenge/${id}`);
  },
};
