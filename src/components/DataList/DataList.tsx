import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Content } from '../../helpers/types/Content';
import { SearchLink } from '../SearchLink/SearchLink';
import './DataList.scss';

type Props = {
  content: Content;
  toggleClick: () => void;
  isFiles: boolean;
};

export const DataList: React.FC<Props> = ({
  content,
  toggleClick,
  isFiles,
}) => {
  const normalizeTime = (date: string) => {
    const [day, time] = date.slice(0, date.length - 1).split('T');

    const dayString = day.split('-').reverse().join('/');
    const timeString = time.split(':').slice(0, 2).join(':');

    return dayString + ' ' + timeString;
  };
  const [searchParams] = useSearchParams();
  const theadList = ['Name', 'Modified'];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <div className="content-field__table datalist">
      <table>
        <thead>
          <tr>
            {theadList.map((theadName) => {
              const lowerTheadName = theadName.toLowerCase();
              let newSortParams = {};

              if (sort !== lowerTheadName) {
                newSortParams = { sort: lowerTheadName, order: null };
              } else if (sort === lowerTheadName && order === null) {
                newSortParams = { order: 'desc' };
              } else {
                newSortParams = { sort: null, order: null };
              }

              return (
                <th key={theadName} className="datalist__title">
                  {theadName === 'Modified' && !isFiles ? (
                    ''
                  ) : (
                    <span className="has-text-white">
                      {theadName}
                      <SearchLink params={newSortParams}>
                        <span className="icon has-text-white">
                          <i
                            className={classNames(
                              'fas',
                              { 'fa-sort': sort !== lowerTheadName },
                              {
                                'fa-sort-up': sort === lowerTheadName && !order,
                              },
                              {
                                'fa-sort-down':
                                  sort === lowerTheadName && !!order,
                              },
                            )}
                          />
                        </span>
                      </SearchLink>
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {content.map((item) => (
            <tr key={item.name}>
              {item['.tag'] === 'folder' ? (
                <td>
                  <Link
                    to={item.name}
                    className={`datalist__item datalist__item--${item['.tag']}`}
                  >
                    {item.name}
                  </Link>
                </td>
              ) : (
                <td>
                  <button
                    className={`datalist__item datalist__item--${item['.tag']}`}
                    onClick={toggleClick}
                  >
                    {item.name}
                  </button>
                </td>
              )}
              <td>
                {item['.tag'] === 'file' && normalizeTime(item.server_modified)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
