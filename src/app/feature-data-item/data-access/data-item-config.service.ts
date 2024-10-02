import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IDataItemConfig } from '@app/feature-data-item/models';
import { PAGE_SIZE } from '@app/shared/constants';

const DEFAULT_CONFIG: IDataItemConfig = {
  dataItemIds: [],
  pageSize: PAGE_SIZE
};

@Injectable({
  providedIn: 'root',
})
export class DataItemConfigService {
  private configStorage = new BehaviorSubject<IDataItemConfig>(DEFAULT_CONFIG);
  readonly config$ = this.configStorage.asObservable();

  get config() {
    return this.configStorage.getValue();
  }

  setConfig(config: IDataItemConfig) {
    this.configStorage.next({ ...config });
  }

  updatePageSize(pageSize: number) {
    const config = this.config;

    this.configStorage.next({ ...config, pageSize });
  }

  updateIds(dataItemIds: string[]) {
    const config = this.config;

    this.configStorage.next({ ...config, dataItemIds });
  }
}
