import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { slice } from 'ramda';

import { DataItem } from '@app/feature-data-item/models';
import { VIEW_ITEMS_SIZE } from '@app/shared';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Input()
  set data(items: DataItem[]) {
    this.dataItems = slice(0, VIEW_ITEMS_SIZE, items);
  }

  dataItems: DataItem[] = [];

  trackByFn(index: number, item: DataItem): string {
    return item.id;
  }
}
