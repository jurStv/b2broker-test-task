import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';

import { PAGE_SIZE, SOCKET_INTERVAL } from '@app/shared';
import { DefaultToPipe, KeysPipe } from '@app/shared/pipes';

import en from '../../../../assets/i18n/en.json';

import { SettingsControlGroupComponent } from './settings-control-group.component';

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

describe('SettingsControlGroupComponent', () => {
  let component: SettingsControlGroupComponent;
  let fixture: ComponentFixture<SettingsControlGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsControlGroupComponent, DefaultToPipe, KeysPipe],
      imports: [ReactiveFormsModule, getTranslocoModule()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsControlGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with default values', () => {
    expect(component.settingsGroup.get('socketInterval')?.value).toBe(SOCKET_INTERVAL);
    expect(component.settingsGroup.get('pageSize')?.value).toBe(PAGE_SIZE);
    expect(component.settingsGroup.get('dataItemIds')?.value).toBe('');
  });

  it('should emit socket interval change event', fakeAsync(() => {
    const intervalChangeSpy = jest.spyOn(component.socketIntervalChange, 'emit');
    component.settingsGroup.get('socketInterval')?.setValue(1324);
    fixture.detectChanges();

    tick(400);

    expect(intervalChangeSpy).toHaveBeenCalledWith(1324);
  }));

  it('should emit data size change event', fakeAsync(() => {
    const dataSizeChangeSpy = jest.spyOn(component.pageSizeChange, 'emit');
    component.settingsGroup.get('pageSize')?.setValue(1324);
    fixture.detectChanges();

    tick(400);

    expect(dataSizeChangeSpy).toHaveBeenCalledWith(1324);
  }));

  it('should emit data item Ids change event', fakeAsync(() => {
    const dataItemIdsChangeSpy = jest.spyOn(component.dataItemIdsChange, 'emit');
    component.settingsGroup.get('dataItemIds')?.setValue('john1, doe2');
    component.settingsGroup.get('dataItemIds')?.setValue('john1, doe2');
    fixture.detectChanges();

    tick(400);

    expect(dataItemIdsChangeSpy).toHaveBeenCalledWith(['john1', 'doe2']);
  }));
});
