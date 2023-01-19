import { Journal, JournalBrief } from "./Journal";
import { Http, HttpResult } from "../../Services/Http";

export const JournalService = {
  async addNew(journal: Journal): Promise<HttpResult<Journal>> {
    const response = await Http.post<Journal>("journals", journal);
    return response;
  },

  async getJournal(journalId: string): Promise<HttpResult<Journal>> {
    const response = await Http.get<Journal>(`journals/${journalId}`);
    return response;
  },

  async getListJournalBrief(): Promise<HttpResult<JournalBrief[]>> {
    return await Http.get<JournalBrief[]>(`journals/briefs`);
  }
};
