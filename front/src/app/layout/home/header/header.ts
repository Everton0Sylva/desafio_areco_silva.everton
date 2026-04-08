import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'areco-header',
  imports: [
    CommonModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnDestroy {
 @Input() isDark: boolean = false;
  private destroy$ = new Subject<void>();

  private themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggle();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
