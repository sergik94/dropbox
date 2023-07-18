import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.scss';

type Props = {
  paths: string[];
};

export const Navigation: React.FC<Props> = ({ paths }) => {
  const location = useLocation();
  let counter = 0;

  return (
    <div className="content__navigation navigation">
      {location.pathname === '/' ? (
        <p className="navigation__link">root</p>
      ) : (
        paths.map((path) => {
          counter += 1;
          const namesList = path.split('/');
          let folderName = namesList[namesList.length - 1]
            .split('%20')
            .join(' ');

          if (folderName === '') {
            folderName = 'root';
          }

          return (
            <Fragment key={path + counter}>
              {folderName !== 'root' && (
                <span className="navigation__slash">/</span>
              )}

              <Link to={`../${path}`} className="navigation__link">
                {folderName}
              </Link>
            </Fragment>
          );
        })
      )}
    </div>
  );
};
