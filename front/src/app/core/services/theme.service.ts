import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'areco-theme';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
   private _isDark$ = new BehaviorSubject<boolean>(this.loadInitial());
  isDark$ = this._isDark$.asObservable();

  private loadInitial(): boolean {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) return saved === 'dark';
    return false;
  }

  toggle(): void {
    const next = !this._isDark$.value;
    this.setTheme(next);
  }

  setTheme(isDark: boolean): void {
    this._isDark$.next(isDark);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    this.applyTheme(isDark);
  }

  applyTheme(isDark: boolean): void {
    const body = document.body;
    if (isDark) body.classList.add('dark-theme');
    else body.classList.remove('dark-theme');
  }
}
