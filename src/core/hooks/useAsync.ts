import { useState, useCallback, useRef, useEffect } from 'react';
import { AppError } from '../errors/AppError';
import { toAppError } from '../errors/ErrorHandler';

/** Possible states of an async operation. */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  error: AppError | null;
  status: AsyncStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface UseAsyncReturn<T, A extends unknown[]> extends AsyncState<T> {
  execute: (...args: A) => Promise<T | null>;
  reset: () => void;
}

const initialState = <T>(): AsyncState<T> => ({
  data: null,
  error: null,
  status: 'idle',
  isLoading: false,
  isSuccess: false,
  isError: false,
});

/**
 * General-purpose hook for managing async operation state.
 *
 * Eliminates the repetitive `isLoading / error / data` pattern found in
 * every component that calls an API.  Wrap any async function and receive
 * a typed state object plus a stable `execute` callback.
 *
 * @example
 * ```ts
 * const { execute: login, isLoading, error } = useAsync(
 *   (credentials: LoginCredentials) => loginUseCase.execute(credentials)
 * );
 * ```
 */
export function useAsync<T, A extends unknown[]>(
  asyncFn: (...args: A) => Promise<T>,
): UseAsyncReturn<T, A> {
  const [state, setState] = useState<AsyncState<T>>(initialState<T>());
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: A): Promise<T | null> => {
      setState({
        data: null,
        error: null,
        status: 'loading',
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        const result = await asyncFn(...args);
        if (isMountedRef.current) {
          setState({
            data: result,
            error: null,
            status: 'success',
            isLoading: false,
            isSuccess: true,
            isError: false,
          });
        }
        return result;
      } catch (err: unknown) {
        const appError = toAppError(err);
        if (isMountedRef.current) {
          setState({
            data: null,
            error: appError,
            status: 'error',
            isLoading: false,
            isSuccess: false,
            isError: true,
          });
        }
        return null;
      }
    },
    [asyncFn],
  );

  const reset = useCallback(() => {
    setState(initialState<T>());
  }, []);

  return { ...state, execute, reset };
}
