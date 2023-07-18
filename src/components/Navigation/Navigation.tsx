import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { normalizeFolderName } from '../../helpers/functions/normalizeFolderName';
import { Dropdown } from '../Dropdown';
import './Navigation.scss';

type Props = {
  paths: string[];
};

export const Navigation: React.FC<Props> = ({ paths }) => {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleLinks, setVisibleLinks] = useState(5);
  let counter = 0;

  useEffect(() => {
    if (windowWidth < 720) {
      setVisibleLinks(2);
    } else {
      setVisibleLinks(5);
    }
  }, [windowWidth]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="content-field__navigation navigation">
      {paths.length > visibleLinks && <Dropdown paths={paths} />}
      {location.pathname === '/' ? (
        <p className="navigation__link">root</p>
      ) : (
        paths.slice(-visibleLinks).map((path) => {
          counter += 1;
          const folderName = normalizeFolderName(path);

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
