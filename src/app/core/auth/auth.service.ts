import { Injectable, computed, signal } from '@angular/core';

const storageKey = 'plataformaFront.isAuthenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authenticated = signal<boolean>(this.readAuthState());

  readonly isAuthenticated = computed(() => this.authenticated());

  login(email: string, password: string): boolean {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    this.authenticated.set(true);
    localStorage.setItem(storageKey, 'true');
    return true;
  }

  logout(): void {
    this.authenticated.set(false);
    localStorage.removeItem(storageKey);
  }

  private readAuthState(): boolean {
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  }
}
