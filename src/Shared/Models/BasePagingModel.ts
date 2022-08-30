export type BasePagingModel<T> = {
  data: T[];
  metadata: PagingMetaData;
};

export type PagingMetaData = {
  pageSize: number;
  pageIndex: number;
  totalCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
