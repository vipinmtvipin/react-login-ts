
export interface ApiRequest<T> {
  api: () => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
  setLoading?: (loading: boolean) => void;
}


export class ApiExecutor {
  static async execute<T>(request: ApiRequest<T>) {
    const { api, onSuccess, onError, setLoading } = request;

    setLoading?.(true);

    try {
      const response = await api();
      onSuccess?.(response);
    } catch (error) {
      onError?.(error);
    } finally {
      setLoading?.(false);
    }
  }

  /**
   * Example 
   * ApiExecutor.execute({
       api: () => userRepository.getProfile(),
       setLoading: setProfileLoading,
       onSuccess: setProfile,
       onError: console.error,
      });
   */

  static async executeAll(
    requests: ApiRequest<unknown>[],
    onCompleted?: () => void
  ) {
    requests.forEach(r => r.setLoading?.(true));

    const promises = requests.map(async request => {
      try {
        const result = await request.api();
        request.onSuccess?.(result);
      } catch (error) {
        request.onError?.(error);
      } finally {
        request.setLoading?.(false);
      }
    });

    await Promise.allSettled(promises);

    onCompleted?.();
  }
}