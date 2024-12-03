import { create } from 'zustand';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { User } from '../../../domain/entities/User';
import { StorageAdapter } from '../../../config/adapters/storage-adapter';
import { authCheckStatus, authLogin } from '../../../actions/auth/auth';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (correo: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (correo: string, password: string) => {
    const resp = await authLogin(correo, password);
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
    return true;
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();
    if (!resp) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return;
    }
    await StorageAdapter.setItem('token', resp.token);
    set({ status: 'authenticated', token: resp.token, user: resp.user });
  },

  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },
}));
