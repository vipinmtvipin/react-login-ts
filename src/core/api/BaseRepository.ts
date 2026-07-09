/**
 * Generic base repository.
 *
 * Provides a `handleRequest` helper that every concrete repository
 * implementation can use to execute a data-source call and get back
 * a typed result — without repeating try/catch boilerplate.
 *
 * ## Dependency Flow
 * ```
 * UseCase → Repository (interface) → [BaseRepository] → DataSource → Axios
 * ```
 *
 * ## How to extend
 * ```ts
 * export class ProductRepositoryImpl
 *   extends BaseRepository
 *   implements ProductRepository
 * {
 *   constructor(private readonly ds: ProductRemoteDataSource) {
 *     super();
 *   }
 *
 *   getProducts(): Promise<Product[]> {
 *     return this.handleRequest(() => this.ds.fetchProducts());
 *   }
 * }
 * ```
 */
export abstract class BaseRepository {
  /**
   * Delegates to `request` and returns the resolved value.
   * Errors propagate as `AppError` because the Axios response interceptor
   * already maps all Axios errors via `handleAxiosError`.
   */
  protected handleRequest<T>(request: () => Promise<T>): Promise<T> {
    return request();
  }
}
