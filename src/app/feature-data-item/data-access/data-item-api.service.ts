import { Injectable } from '@angular/core';

import { IDataItemConfig } from '@app/feature-data-item/models';

@Injectable({
  providedIn: 'root',
})
export class DataItemApiService {
  private readonly _worker: Worker;

  get worker() {
    return this._worker;
  }

  constructor(
  ) {
    this._worker = new Worker(new URL('../utils/data-item.worker', import.meta.url));
  }

  requestDataItems(config: IDataItemConfig): void {
    if (!this.worker) {
      return;
    }

    this.worker.postMessage({ config });
  }
}
