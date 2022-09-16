import { PagingDefault } from "../Constants/Paging";
import { Filter, PagingMetaData } from "../Models/BasePagingModel";

export function createDefaultPaging(): PagingMetaData {
  return {
    pageIndex: PagingDefault.pageIndex,
    pageSize: PagingDefault.pageSize,
  };
}

export function createDefaultFilter(): Filter {
  return {
    ...createDefaultPaging(),
    keyword: "",
  };
}
