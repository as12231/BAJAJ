import React, { useState } from 'react';
import Select from 'react-select';

const App = () => {
  const [apiInput, setApiInput] = useState('');
  const [filteredResponse, setFilteredResponse] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highestLowercase', label: 'Highest Lowercase Alphabet' },
  ];

  const handleApiInputChange = (e) => {
    setApiInput(e.target.value);
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions || []);
  };

  const handleSubmit = () => {
    try {
      const data = JSON.parse(apiInput).data;
      let filteredData = [];

      if (selectedFilters.some((filter) => filter.value === 'numbers')) {
        filteredData = filteredData.concat(data.filter((item) => !isNaN(item)));
      }

      if (selectedFilters.some((filter) => filter.value === 'alphabets')) {
        filteredData = filteredData.concat(data.filter((item) => /^[A-Za-z]+$/.test(item)));
      }

      if (selectedFilters.some((filter) => filter.value === 'highestLowercase')) {
        const lowercaseLetters = data.filter((item) => /^[a-z]+$/.test(item));
        if (lowercaseLetters.length > 0) {
          const highestLowercase = lowercaseLetters.sort().pop();
          filteredData.push(highestLowercase);
        }
      }

      setFilteredResponse(filteredData.join(','));
    } catch (e) {
      alert('Invalid JSON input');
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  };

  const boxStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
  };

  return (
    <div style={containerStyle}>
      <div style={boxStyle}>
        <h2 color='blue'>API Input</h2>
        <textarea
          value={apiInput}
          onChange={handleApiInputChange}
          placeholder='{"data":["M","1","334","4","B"]}'
          rows='4'
          cols='50'
          style={{ width: '100%', boxSizing: 'border-box' }}
        />
        <br />
        <button
          onClick={handleSubmit}
          style={{ marginTop: '10px', padding: '10px 20px',width:'100%',backgroundColor:'blue' }}
        >
          Submit
        </button>
        <br />
        <h3 style={{ marginTop: '20px' }}>Multi Filter</h3>
        <Select
          isMulti
          options={options}
          onChange={handleFilterChange}
          placeholder="Select filters"
        />
        <br />
        {filteredResponse && (
          <div>
            <h3>Filtered Response</h3>
            <p>{filteredResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
