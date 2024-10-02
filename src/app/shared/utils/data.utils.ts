export const splitAndTrim = (str: string): string[] => str.split(',').reduce((ids: string[], id: string) => {
  const idTrimmed: string = id.trim();

  if (idTrimmed) {
    return [...ids, idTrimmed];
  }

  return ids;
}, [])

