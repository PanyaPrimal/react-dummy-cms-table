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
    if (pathSegments.length > 1) {
      const targetTabId = pathSegments[1];
      return sortedTabs.find((tab) => tab.id === targetTabId);
    }
    return null;
  };

  const activeTab = getActiveTab();

  useEffect(() => {
    if (!activeTab) {
      navigate(`/${sortedTabs[0].id}`);
    }
  }, [navigate, activeTab, sortedTabs]);


  return (
    <div className="App">
      <nav>
        <ul className='links'>
          {sortedTabs.map((tab) => (
            <li key={tab.id}>
              <Link
                to={`/${tab.id}`}
                className={location.pathname === `/${tab.id}` ? 'active-tab' : ''}
              >
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Routes>
        {sortedTabs.map((tab) => (
          <Route key={tab.id} path={`/${tab.id}`} element={<LazyComponent path={tab.path} />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;