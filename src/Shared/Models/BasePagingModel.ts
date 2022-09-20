export type BasePagingModel<T> = {
  data: T[];
  metadata: PagingMetaData;
};

export type PagingMetaData = {
  pageSize: number;
  pageIndex: number;
};

export type Filter = {
  pageIndex: number;
  pageSize: number;
  keyword: string;
};
