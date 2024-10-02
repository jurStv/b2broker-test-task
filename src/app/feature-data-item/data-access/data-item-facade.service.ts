import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { DataItem, IDataItemConfig } from '@app/feature-data-item/models';
import { SOCKET_INTERVAL } from '@app/shared/constants';
import { PersistentStorageService } from '@app/shared/services';

import { DataItemConfigService } from './data-item-config.service';
import { DataItemApiService } from './data-item-api.service';
import { DataItemStorageService } from './data-item-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataItemFacadeService {
  private _socketIntervalSubject: BehaviorSubject<number>;

  get dataItem$() {
    return this.storageService.result$;
  }

  get config() {
    return this.configService.config;
  }

  get socketInterval() {
    return this._socketIntervalSubject.getValue();
  }

  constructor(
    private readonly configService: DataItemConfigService,
    private readonly storageService: DataItemStorageService,
    private readonly apiService: DataItemApiService,
    private readonly storage: PersistentStorageService,
  ) {
    const initialSocketInterval = this.storage.getItem('socketInterval');
    const initialConfig = this.storage.getItem('config');

    if (initialConfig) {
      this.configService.setConfig(initialConfig);
    }

    this._socketIntervalSubject = new BehaviorSubject<number>(initialSocketInterval || SOCKET_INTERVAL);

    this.apiService.worker.onmessage = (event: MessageEvent<DataItem[]>): void => {
      this.storageService.setDataItems(event.data);
    };

    /* Emulate socket data stream */
    const timer$ = this._socketIntervalSubject.asObservable().pipe(
      switchMap((intervalValue: number) => timer(0, intervalValue))
    );

    combineLatest([
      this.configService.config$,
      timer$
    ]).pipe(
      tap(([config, _]) => this.apiService.requestDataItems(config))
    ).subscribe();

    this.configService.config$.pipe(
      tap((config) => this.storage.setItem('config', config))
    ).subscribe();

    this._socketIntervalSubject.asObservable().pipe(
      tap((socketInterval) => this.storage.setItem('socketInterval', socketInterval))
    ).subscribe();
  }

  updateConfig(config: IDataItemConfig) {
    this.configService.setConfig(config);
  }

  patchConfig(config: Partial<IDataItemConfig>) {
    const curConfig = this.configService.config;

    this.configService.setConfig({ ...curConfig, ...config });
  }

  updateSocketInterval(interval: number) {
    this._socketIntervalSubject.next(interval);
  }

}
