import React, { useEffect, useState } from 'react'

const App = () => {
  const [data, setData]= useState([]);
  const [search, setSearch]= useState("");
  useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res)=> res.json())
    .then((d)=>setData(d));
  });
  return (
    <div>
      <input onChange={(e)=>setSearch(e.target.value)} />
      {data
      .filter((item,index)=> item.category.toUpperCase().includes(search))
      .map((item,index)=>{
        return(
          <div key={index}>
            <img src={item.image} height={"200px"} width={"200px"} alt="" />
            <span>{item.category}</span>
          </div>
        )
      })
      }
    </div>
  )
}

export default App