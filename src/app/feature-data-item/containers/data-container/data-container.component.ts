import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataItemFacadeService } from '@app/feature-data-item/data-access';
import { ISettingsGroup, SETTINGS_GROUP_TOKEN, createDefaultSettingsGroup } from '@app/feature-data-item/components';

@Component({
  selector: 'app-data-container',
  templateUrl: './data-container.component.html',
  styleUrls: ['./data-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: SETTINGS_GROUP_TOKEN,
      useValue: createDefaultSettingsGroup()
    }
  ]
})
export class DataContainerComponent implements OnInit {
  get dataItem$() {
    return this.dataItemFacade.dataItem$;
  }

  constructor(
    @Inject(SETTINGS_GROUP_TOKEN) private readonly settingsForm: FormGroup<ISettingsGroup>,
    private readonly dataItemFacade: DataItemFacadeService,
  ) {}

  public ngOnInit(): void {
    // Setup initial config data
    const config = this.dataItemFacade.config;
    const socketInterval = this.dataItemFacade.socketInterval;

    this.settingsForm.setValue({
      socketInterval,
      dataItemIds: config.dataItemIds.join(', '),
      pageSize: config.pageSize
    });
  }

  public onSocketIntervalChange(interval: number) {
    this.dataItemFacade.updateSocketInterval(interval);
  }

  public onPageSizeChange(pageSize: number) {
    this.dataItemFacade.patchConfig({ pageSize });
  }

  public onUpdateDataItemIds(dataItemIds: string[]) {
    this.dataItemFacade.patchConfig({ dataItemIds });
  }
}
