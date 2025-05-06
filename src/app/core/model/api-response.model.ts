export interface IApiResponse<T> {
  data?: T;
  success: boolean;
  message?: string;
  errors?: string[];
}
