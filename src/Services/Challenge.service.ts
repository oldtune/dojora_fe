import { Observable } from "rxjs";
import {
  Challenge,
  ChallengeResponse,
} from "../components/Challenge_List/Challenge";
import { BasePagingModel } from "../Shared/Models/BasePagingModel";
import { HttpService } from "./Http.service";

export const ChallengeService = {
  getList: function (): Observable<ChallengeResponse[]> {
    return HttpService.get<ChallengeResponse[]>("challenges");
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
