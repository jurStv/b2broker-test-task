import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';

import { DataItem } from '@app/feature-data-item/models';
import { DefaultToPipe, KeysPipe } from '@app/shared/pipes';

import en from '../../../../assets/i18n/en.json';

import { DataTableComponent } from './data-table.component';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en },
    translocoConfig: {
      availableLangs: ['en'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}

@Component({
  selector: 'app-data-items-container',
  template: '<app-data-table [data]="data"></app-data-table>',
})
class DataItemsContainerComponent {
  data: DataItem[] = [];
}

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataItemsContainerComponent>;

  const item1 = new DataItem('john1', 2, 1.1, 'pink', { id: 'john11',  color: 'cyan' });
  const item2 = new DataItem('doe2', 3, 2.2, 'blue', { id: 'doe22',  color: 'gold' });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataTableComponent, DataItemsContainerComponent, DefaultToPipe, KeysPipe],
      imports: [getTranslocoModule()],
    }).compileComponents();

    fixture = TestBed.createComponent(DataItemsContainerComponent);
    component = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input data correctly', () => {
    const testData: DataItem[] = [
      item1,
      item2,
    ];

    fixture.componentInstance.data = testData;
    fixture.detectChanges();

    expect(component.dataItems).toEqual(testData);
  });

  it('should render the correct number of rows', () => {
    const testData: DataItem[] = [
      item1,
      item2,
    ];

    fixture.componentInstance.data = testData;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('.data-table__row');

    expect(tableRows.length).toBe(testData.length * 2);
  });

  it('should call trackByFn for each item in data', () => {
    const trackBySpy = jest.spyOn(component, 'trackByFn');
    const testData: DataItem[] = [
      item1,
      item2,
    ];

    fixture.componentInstance.data = testData;
    fixture.detectChanges();

    expect(trackBySpy).toHaveBeenCalledTimes(testData.length);
  });

  it('should apply correct background color style for color cells', () => {
    fixture.componentInstance.data = [
      item1,
    ];
    fixture.detectChanges();

    const colorCell = fixture.nativeElement.querySelector('.data-table__cell:nth-child(4) span');
    expect(colorCell.style.backgroundColor).toBe('pink');
  });

  it('should bind data correctly to the template', () => {
    fixture.componentInstance.data = [
      item1,
      item2,
    ];
    fixture.detectChanges();

    const firstRowCells = fixture.nativeElement.querySelector('.data-table__row').querySelectorAll('.data-table__cell');
    expect(firstRowCells[0].textContent.trim()).toBe('john1');
    expect(firstRowCells[1].textContent.trim()).toBe('2');
  });
});
