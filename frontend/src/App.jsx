import React from 'react';
import BugList from './components/BugList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <BugList />
      </div>
    </div>
  );
};

export default App;
