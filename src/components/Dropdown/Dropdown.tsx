/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Dropdown.scss';
import { Link } from 'react-router-dom';
import { normalizeFolderName } from '../../helpers/functions/normalizeFolderName';

type Props = {
  paths: string[];
};

export const Dropdown: React.FC<Props> = ({ paths }) => {
  const [isListShown, setListShown] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  let counter = 0;

  const toggleList = () => {
    setListShown(!isListShown);
  };

  const handleUserClick = () => () => {
    toggleList();
  };

  const handleClick = useCallback(({ target }: MouseEvent) => {
    const node = ulRef?.current;
    const button = buttonRef?.current;

    if (node
        && target instanceof Node
        && !node.contains(target)
        && target !== button) {
      setListShown(false);
    }
  }, [isListShown, ulRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return (
    <div className="dropdown">
      <button className="dropdown__button" onClick={toggleList} ref={buttonRef}>
        ...
      </button>

      <ul
        className={classNames('dropdown__list', {
          'dropdown__list--is-active': !!isListShown,
        })}
        ref={ulRef}
      >
        {paths.slice(0, paths.length - 1).map((path) => {
          counter += 1;
          const folderName = normalizeFolderName(path);

          return (
            <li key={path + counter} className="dropdown__item">
              <Link
                to={`../${path}`}
                className="dropdown__link"
                onClick={handleUserClick}
              >
                {folderName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
