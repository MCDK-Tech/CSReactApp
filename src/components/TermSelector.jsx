import React from "react";

const terms = {
    Fall: 'Fall', 
    Winter: 'Winter', 
    Spring: 'Spring'

};

const MenuButton = ({term, selection, setSelection}) => (
    <div>
      <input type="radio" 
        id={term} 
        className="btn-check" 
        checked={term === selection} 
        autoComplete="off"
        onChange={() => setSelection(term)} />
      <label className="btn btn-success mb-1 p-2" htmlFor={term}>
      { term }
      </label>
    </div>
  );


const TermSelector = ({ selection, setSelection}) => (
    <div className="btn-group">
      { 
        Object.keys(terms).map(term => 
        <MenuButton 
            key={term}
            term={term} 
            selection={selection} 
            setSelection={setSelection} />)
      }
    </div>
  );

  export default TermSelector;