export interface ErrorI {
  isLoading: boolean;
  error: {
    data: {
      message: string[];
    };
  };
  isError: boolean;
}
