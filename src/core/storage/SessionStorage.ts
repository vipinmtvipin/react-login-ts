/**
 * @deprecated Use `TokenStorage` from `./TokenStorage` instead.
 * This file is retained only for backward compatibility during migration.
 */
import { TokenStorage } from './TokenStorage';

export const saveToken = (token: string): void => TokenStorage.save(token);
export const getToken = (): string | null => TokenStorage.get();
export const removeToken = (): void => TokenStorage.remove();


