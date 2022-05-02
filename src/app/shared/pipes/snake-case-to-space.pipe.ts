import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakeCaseToSpace',
  pure:true,
})
export class SnakeCaseToSpacePipe implements PipeTransform {
  transform(value: string): string {
    if(!value) return ''
    return value.replace('_', ' ');
  }
}
