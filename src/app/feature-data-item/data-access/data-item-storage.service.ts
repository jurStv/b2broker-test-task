import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DataItem } from '@app/feature-data-item/models';

@Injectable({
  providedIn: 'root',
})
export class DataItemStorageService {
  private resultSubject = new BehaviorSubject<DataItem[]>([]);

  readonly result$ = this.resultSubject.asObservable();

  setDataItems(items: DataItem[]) {
    this.resultSubject.next(items);
  }
}
