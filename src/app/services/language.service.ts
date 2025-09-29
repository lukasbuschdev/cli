import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import en from '../../../public/languages/en.json';
import de from '../../../public/languages/de.json';
import es from '../../../public/languages/es.json';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang: BehaviorSubject<string> = new BehaviorSubject<string>('en');
  private translations: any = {};

  constructor() {
    const savedLang = localStorage.getItem('selectedLang') || 'en';
    this.currentLang.next(savedLang);
    this.loadLanguage(savedLang);
  }

  public get currentLanguage(): string {
    return this.currentLang.value;
  }

  getCurrentLanguage(): Observable<string> {
    return this.currentLang.asObservable();
  }

  changeLanguage(lang: string): void {
    this.currentLang.next(lang);
    localStorage.setItem('selectedLang', lang);
    this.loadLanguage(lang);
  }

  private loadLanguage(lang: string): void {
    if(lang === 'en') {
      this.translations = en;
    } else if(lang === 'es') {
      this.translations = es;
    } else if(lang === 'de') {
      this.translations = de;
    } else {
      this.translations = en;
    }
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }
}