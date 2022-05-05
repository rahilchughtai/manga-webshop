import { Pipe, PipeTransform } from '@angular/core';

import { getPriceByPublishingDate } from '../utils/manga-utils';

@Pipe({
  name: 'mangaDateToPrice',
  pure: true,
})
export class MangaDateToPricePipe implements PipeTransform {
  transform(pubDate: Date): number {
    return getPriceByPublishingDate(pubDate);
  }
}
