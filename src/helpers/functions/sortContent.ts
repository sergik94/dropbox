import { Content } from '../types/Content';
import { SortType } from '../types/SortType';

export const sortContent = (
  content: Content,
  sortBy: string | null,
  order: string | null,
) => {
  const copyArr = [...content];

  const convertDate = (date: string) => {
    const [day, time] = date.slice(0, date.length - 1).split('T');
    const dayString = day.split('-').join('');
    const timeString = time.split(':').join('');

    return +(dayString + timeString);
  };

  copyArr.sort((dataA, dataB): number => {
    switch (sortBy) {
      case SortType.Name:
        if (order === 'desc') {
          return dataB[sortBy].localeCompare(dataA[sortBy]);
        }

        return dataA[sortBy].localeCompare(dataB[sortBy]);

      case SortType.Modified:
        if (dataA['.tag'] === 'file' && dataB['.tag'] === 'file') {
          if (order === 'desc') {
            return (
              convertDate(dataB.server_modified) -
              convertDate(dataA.server_modified)
            );
          }
          return (
            convertDate(dataA.server_modified) -
            convertDate(dataB.server_modified)
          );
        }
    }

    return 0;
  });

  return copyArr;
};
