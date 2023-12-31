import React, { useState, useContext, useEffect } from 'react';
import PageInfoContext from '../../../context/PageInfo.context';
import { Search } from '@carbon/react';

const EsPageSearch = (props) => {

  const { searchText, updateSearchText } = useContext(PageInfoContext);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => updateSearchText(inputValue),[inputValue]);


  return (
    <div className='es-content-page-search'>
      <Search size="lg"
        placeholder={`Search ${props.title}`}
        labelText="Search" 
        closeButtonLabelText="Clear search input"
        id="search-1"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={() => {}}
        value={searchText}
      />
    </div>
  )
}

export default EsPageSearch
