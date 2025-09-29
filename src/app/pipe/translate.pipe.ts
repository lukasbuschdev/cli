import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  language = inject(LanguageService);

  transform(key: string): string {
    return this.language.getTranslation(key);
  }
}