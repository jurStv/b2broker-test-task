import { ChangeDetectionStrategy, Component, EventEmitter, Inject, InjectionToken, type OnInit, Optional, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, debounceTime, pairwise, startWith } from 'rxjs/operators';
import { OnDestroy$, takeUntilDestroyed } from '@pdtec/ngx-observable-lifecycle';
import { equals, not } from 'ramda';

import { PAGE_SIZE, SOCKET_INTERVAL, IDS_VALIDATION_PATTERN, splitAndTrim, requiredWithKey, patternWithKey } from '@app/shared';

export interface ISettingsGroup {
  socketInterval: FormControl<number | null>;
  pageSize: FormControl<number | null>;
  dataItemIds: FormControl<string | null>;
}

export const SETTINGS_GROUP_TOKEN = new InjectionToken<FormGroup<ISettingsGroup>>('SETTINGS_GROUP_TOKEN');
export const createDefaultSettingsGroup = () => new FormGroup<ISettingsGroup>({
  socketInterval: new FormControl(SOCKET_INTERVAL, requiredWithKey('shared.validationMessage.required')),
  pageSize: new FormControl(PAGE_SIZE, requiredWithKey('shared.validationMessage.required')),
  dataItemIds: new FormControl('', patternWithKey(IDS_VALIDATION_PATTERN, 'dataItemIds.validationMessage.pattern')),
})

@Component({
  selector: 'app-settings-control-group',
  templateUrl: './settings-control-group.component.html',
  styleUrls: ['./settings-control-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsControlGroupComponent extends OnDestroy$ implements OnInit {
  @Output() public socketIntervalChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() public pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() public dataItemIdsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  get settingsGroup() {
    return this._settingsGroup;
  }

  get socketIntervalControlErrors() {
    return this.settingsGroup.get('socketInterval')?.errors;
  }

  get pageSizeControlErrors() {
    return this.settingsGroup.get('pageSize')?.errors;
  }

  get dataItemIdsControlErrors() {
    return this.settingsGroup.get('dataItemIds')?.errors;
  }

  constructor(
    @Optional() @Inject(SETTINGS_GROUP_TOKEN)
      private _settingsGroup: FormGroup<ISettingsGroup>,
  ) {
    super();

    // Get form group from providers or create new one
    this._settingsGroup = _settingsGroup || createDefaultSettingsGroup();
  }

  ngOnInit(): void {
    this.settingsGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this),
        debounceTime(250),
        startWith(this.settingsGroup.value),
        pairwise(),
        tap(([prev, cur]) => {
          if (not(equals(prev.dataItemIds, cur.dataItemIds))) {
            this.dataItemIdsChange.emit(splitAndTrim(cur.dataItemIds as string));
          }

          if (not(equals(prev.pageSize, cur.pageSize))) {
            this.pageSizeChange.emit(cur.pageSize as number);
          }

          if (not(equals(prev.socketInterval, cur.socketInterval))) {
            this.socketIntervalChange.emit(cur.socketInterval as number);
          }
        })
      ).subscribe();
  }

}
