/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import './Authorization.scss';

type Props = {
  isRefresh?: boolean;
  callback?: () => void;
};

export const Authorization: React.FC<Props> = ({
  isRefresh = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {},
}) => {
  const [value, setValue] = useState('');
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const submit = () => {
    if (value.trim() === '') {
      return;
    }
    window.localStorage.setItem('token', JSON.stringify([value]));
    window.location.reload();
    setValue('');
    callback();
  };

  const cancelRefresh = () => {
    callback();
  };

  return (
    <section className="authorization">
      <div className="authorization__container">
        {!isRefresh && (
          <>
            <h1 className="authorization__title">Welcome</h1>
            <p className="authorization__text">
              To continue, follow these steps:
            </p>
            <ol className="authorization__list">
              <li className="authorization__item">
                Create an account or log into{' '}
                <a
                  className="authorization__link"
                  href="https://www.dropbox.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Dropbox
                </a>
              </li>
              <li className="authorization__item">
                Create or select an existing app on{' '}
                <a
                  className="authorization__link"
                  href="https://www.dropbox.com/developers/apps/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Dropbox Developers
                </a>
              </li>
              <li className="authorization__item">
                On the <strong>Permissions</strong> tab, click the{' '}
                <i>files.content.read</i>, <i>file_requests.read</i> checkboxes
                and accept your selection by clicking Submit.
              </li>
              <li className="authorization__item">
                On the <strong>Settings</strong> tab, generate an access token
                and enter it in the field below
              </li>
              <li className="authorization__item">
                Click <strong>Submit</strong>
              </li>
            </ol>
          </>
        )}
        <div className="authorization__form">
          <input
            className="authorization__input"
            type="text"
            value={value}
            placeholder="Enter your token..."
            onChange={handleChange}
          />
          <button className="authorization__button" onClick={submit}>
            Submit
          </button>

          {isRefresh && (
            <button
              className="authorization__button authorization__button--cancel"
              onClick={cancelRefresh}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
