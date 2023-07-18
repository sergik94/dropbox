import { useState } from 'react';
import { NotImplemented } from '../NotImplemented';
import './Toolbar.scss';

const buttonsId = [1, 2, 3, 4, 5];

export const Toolbar = () => {
  const [isSomeButtonClick, setSomeButtonClick] = useState(false);
  const handleSomeButtonClick = () => {
    setSomeButtonClick(!isSomeButtonClick);
  };

  return (
    <div className="explorer__toolbar toolbar">
      {isSomeButtonClick && <NotImplemented callback={handleSomeButtonClick} />}
      {buttonsId.map((button) => (
        <button
          key={button}
          className="toolbar__button"
          onClick={handleSomeButtonClick}
        >
          Some button {button}
        </button>
      ))}
    </div>
  );
};
