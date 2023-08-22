export interface IPage {
  page: number;
  results?: Object[] | null;
  total_pages: number;
  total_results: number;
}
