import { Component } from '@angular/core';
import { Header } from './header/header';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'areco-home',
  imports: [
    Header,
    CommonModule,
    Sidebar
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private themeService: ThemeService) {
    this.themeService.isDark$.subscribe(isDark => this.themeService.applyTheme(isDark));
  }
}
