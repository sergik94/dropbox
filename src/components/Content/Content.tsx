/* eslint-disable prettier/prettier */
import { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import './Content.scss';
import { getRootFolder } from '../../api/getRootFolder';
import { NotImplemented } from '../NotImplemented';
import { Navigation } from '../Navigation/Navigation';
import { DataList } from '../DataList/DataList';
import { Loader } from '../Loader';
import { EmptyRoot } from '../EmptyRoot/EmptyRoot';
import { sortContent } from '../../helpers/functions/sortContent';
import { Content as ContentType } from '../../helpers/types/Content';
import { SortType } from '../../helpers/types/SortType';
import { Authorization } from '../Authorization/Authorization';

type Props = {
  paths: string[];
};

export const Content: React.FC<Props> = ({ paths }) => {
  const TOKEN = JSON.parse(window.localStorage.getItem('token') || '[]');
  const [content, setContent] = useState<ContentType>([]);
  const { link = '' } = useParams();
  const location = useLocation();
  const [isClick, setClick] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const [isTokenRefresh, setTokenRefresh] = useState(false);

  const toggleClick = () => {
    setClick(!isClick);
  };

  const refreshToken = () => {
    setTokenRefresh(!isTokenRefresh);
  };

  const getContent = async (path: string) => {
    setLoading(true);
    try {
      const data = await getRootFolder(TOKEN, path);

      setContent(data.result.entries);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const shownContentList = useMemo(() => {
    const folders = [...content].filter((data) => data['.tag'] === 'folder');
    const files = [...content].filter((data) => data['.tag'] === 'file');

    if (!sort) {
      return content;
    }

    const sortedFiles = sortContent(files, sort, order);

    if (sort === SortType.Modified) {
      return folders.concat(sortedFiles);
    }

    const sortedFolders = sortContent(folders, sort, order);

    if (order === 'desc') {
      return sortedFiles.concat(sortedFolders);
    }

    return sortedFolders.concat(sortedFiles);
  }, [sort, order, content]);

  useEffect(() => {
    let currLink = location.pathname;

    if (currLink === '/') {
      currLink = '';
    }

    getContent(currLink.split('%20').join(' '));
  }, [link]);

  return (
    <div className="explorer__content content-field">
      {isClick && (
        <NotImplemented
          callback={toggleClick}
          message="We are sorry, but the ability to view files is not implemented yet"
        />
      )}

      {isLoading && <Loader />}
      {!isError && !isLoading && content.length === 0 && <EmptyRoot />}

      {!isError && !isLoading && content.length !== 0 && (
        <>
          <Navigation paths={paths} />
          <DataList
            content={shownContentList}
            toggleClick={toggleClick}
            isFiles={content.some((data) => data['.tag'] === 'file')}
          />
        </>
      )}
      {isError && !isLoading && (
        <>
          <p className="content-field__error">
            Something went wrong. You may have entered the wrong address in the address bar. If not, try to generate a token again on{' '}
            <a
              className="content-field__link"
              href="https://www.dropbox.com/developers/apps/"
              target="_blank"
              rel="noreferrer"
            >
              Dropbox Developers
            </a>{' '}
            and click <b>Refresh token</b>
          </p>
          <button className="content-field__token" onClick={refreshToken}>
            Refresh token
          </button>
        </>
      )}

      {isTokenRefresh && (
        <Authorization isRefresh={isTokenRefresh} callback={refreshToken} />
      )}
    </div>
  );
};
