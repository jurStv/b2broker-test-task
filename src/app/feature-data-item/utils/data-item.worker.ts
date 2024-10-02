/// <reference lib="webworker" />

import { IDataItemConfig, DataItem, DataItemChild } from '../models';

import { getRandomColor, getRandomFloat, getRandomInteger, getRandomString } from '@app/shared/utils/get-random.utils';

function getDataItems(length: number): DataItem[] {
  return Array.from({ length }, () => createDataItem());
}

function createDataItem(predefinedValues: Partial<Omit<DataItem, 'child'>> = {}): DataItem {
  return new DataItem(
    predefinedValues.id || getRandomString(10),
    predefinedValues.int || getRandomInteger(1, 1000),
    predefinedValues.float || getRandomFloat(0, 1, 18),
    predefinedValues.color || getRandomColor(),
    new DataItemChild(
      getRandomString(5),
      getRandomColor()
    )
  );
}

addEventListener('message', ({ data: { config } }: { data: { config: IDataItemConfig } }): void => {
  const startDataItems = config.dataItemIds.map((id) => createDataItem({ id })).slice(0, config.pageSize);
  const dataItems = getDataItems(config.pageSize - config.dataItemIds.length);

  postMessage([ ...startDataItems, ...dataItems ]);
});


