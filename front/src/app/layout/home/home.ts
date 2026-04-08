import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Header } from './header/header';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';
import { Subject, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'areco-home',
  imports: [
    Header,
    CommonModule,
    Sidebar,
    RouterOutlet
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  isDark = false;
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {
    this.themeService.isDark$.subscribe(isDark => {
      this.themeService.applyTheme(isDark);
    });
  }

  ngOnInit(): void {
    this.themeService.isDark$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.isDark = value;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
