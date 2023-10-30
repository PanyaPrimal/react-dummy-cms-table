import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation  } from 'react-router-dom';
import tabs from './tabs.json';
import LazyComponent from './components/LazyComponent';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const sortedTabs = tabs.slice().sort((a, b) => a.order - b.order);

  const getActiveTab = () => {
    const pathSegments = location.pathname.split('/');
    if (pathSegments.length > 2) {
      const targetTabId = pathSegments[2];
      return sortedTabs.find((tab) => tab.id === targetTabId);
    }
    return null;
  };

  const activeTab = getActiveTab();

  useEffect(() => {
    if (!activeTab) {
      navigate(`/react-dummy-cms-table/${sortedTabs[0].id}`);
    }
  }, []);

  return (
    <div className="App">
      <nav>
        <ul className='links'>
          {sortedTabs.map((tab) => (
            <li key={tab.id}>
              <Link
                to={`/react-dummy-cms-table/${tab.id}`}
                className={location.pathname === `/react-dummy-cms-table/${tab.id}` ? 'active-tab' : ''}
              >
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Routes>
        {sortedTabs.map((tab) => (
          <Route key={tab.id} path={`/react-dummy-cms-table/${tab.id}`} element={<LazyComponent path={tab.path} />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;