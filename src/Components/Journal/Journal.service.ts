import { Journal } from "./Journal";
import { Http, HttpResult } from "../../Services/Http";

export const JournalService = {
  async addNew(journal: Journal): Promise<HttpResult<Journal>> {
    const response = await Http.post<Journal>("journals", journal);
    return response;
  },
};
