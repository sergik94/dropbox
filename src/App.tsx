import './App.scss';
import { Content } from './components/Content/Content';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Authorization } from './components/Authorization/Authorization';
import { Loader } from './components/Loader';

function App() {
  const location = useLocation();
  const [paths, setPaths] = useState<string[]>([]);
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let currPath = '';
    const pathsArr = location.pathname.split('/').map((path) => {
      if (currPath === '') {
        currPath += path;

        return currPath;
      }
      currPath += '/' + path;

      return currPath;
    });

    setPaths(pathsArr);
  }, [location]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);

    const token = JSON.parse(window.localStorage.getItem('token') || '[]');

    if (token[0]) {
      setAuth(true);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuth) {
    return <Authorization />;
  }

  return (
    <div className="App">
      <section className="App__explorer explorer">
        <Toolbar />

        <Routes>
          <Route path="/">
            <Route index element={<Content paths={paths} />} />
            {paths.map((path) => {
              return (
                <Route
                  key={path}
                  path={`${path}/:link`}
                  element={<Content paths={paths} />}
                />
              );
            })}
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
