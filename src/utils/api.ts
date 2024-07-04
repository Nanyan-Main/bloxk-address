export interface ApiResponse<T> {
  status: string | number;
  message?: string;
  data?: T;
}
