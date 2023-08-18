export interface IPage {
  page: number;
  results?: Object[] | null;
  total_pages: number | null;
  total_results: number | null;
}
