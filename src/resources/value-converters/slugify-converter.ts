import { valueConverter } from 'aurelia';

@valueConverter('slugify')
export class SlugifyValueConverter {
    toView(value: string | null) {
      if (!value) {
        return value;
      }
      
     return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, ' ')
        .replace(/[\s-]+/g, '-');
    }
}