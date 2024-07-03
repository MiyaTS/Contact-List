import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-internationalization',
  templateUrl: './internationalization.component.html',
  styleUrl: './internationalization.component.scss',
})
export class InternationalizationComponent implements OnInit{
  lang: string = 'en';
  languages: any[] = [
    { label: 'English', value: 'en' },
    { label: 'Українська', value: 'uk' },
  ];

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.use(this.lang);
  }

  ChangeLang(selectedLanguage: string): void {
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
  }
}
