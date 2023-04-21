import React, { useEffect,useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


const Search = () => {

  const [keyword, setKeyword] = useState("");
  let navigate = useNavigate();

  const {products } = useSelector((state) => state.products);

  const setProducts = () => {
    const data = {
      columns: [
        {
          field: 'name'
        }
      ],
      rows: []
    };
  
    products.forEach((product) => {
      data.rows.push({
        name: product.name,
        id: product.id // add an ID property to the object if needed
      });
    });
  
    return data.rows;
  };
  

  const handleOnSearch = (string, results, ) => {
  
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    const keywordTrimmed = item.name.trim();
    if (keywordTrimmed) {
      navigate(`/search/${keywordTrimmed}`);
      setKeyword(""); 
    } else {
      navigate("/");
    }
  };
  
  const handleClear = () => {
    setKeyword("");
    navigate("", { replace: true });

  };


  const handleOnFocus = () => {
    console.log('Focused');
  };
  const handleOnChange = (e) => {
    setKeyword(e.target.value);
  };

  const formatResult = (item) => {
    return item.name;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 350 }}>
        <ReactSearchAutocomplete
          items={setProducts()}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          type="text"
          id="search_field"
          placeholder="Enter Product Name ..."
          onChange={handleOnChange}
          value={keyword} 
          
        />
        
      </div>
      <button className="btn" onClick={handleClear}>
        Clear Search
      </button>
      </div>
    
  );
};



export default Search;