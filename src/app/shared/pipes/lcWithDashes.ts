import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'lcWithDashes'})
export class LowerCaseWithDashesPipe implements PipeTransform {
  transform(value: string): string {
    return value? value.replace(/_/g, "-").toLowerCase() : value;
  }
}