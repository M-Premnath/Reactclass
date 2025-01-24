import React, { useState } from 'react'
import Data from "./Data.json"
const App = () => {
  const RecordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Data.length / RecordsPerPage );

  function getRecords(){
    const startIndex = (currentPage - 1) * RecordsPerPage;
    const endIndex = startIndex + RecordsPerPage;
    return Data.slice(startIndex, endIndex);
  }

  function handlePrev(){
    setCurrentPage(currentPage -1);
  }

  function handleNext(){
    setCurrentPage(currentPage +1);
  }

  return (
    <div style={{textAlign:"center"}}>
      {getRecords().map((item,index)=>{
        return(
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        );
      })}
      <button disabled={currentPage === 1} onClick={handlePrev}>Prev</button>
      {currentPage}/{totalPages}
      <button disabled={currentPage=== totalPages} onClick={handleNext}>Next</button>
    </div>
  )
}

export default App