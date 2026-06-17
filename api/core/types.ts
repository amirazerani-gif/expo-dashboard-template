export interface LaravelResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LaravelPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    data: T[];
    links: {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number | null;
      last_page: number;
      per_page: number;
      to: number | null;
      total: number;
    };
  };
}
