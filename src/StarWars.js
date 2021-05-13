
import React, { useState } from "react";
import Title from "./Title";
import Character from "./Character"


function StarWars(props) {
  const [id, setId] = useState(1);
  const [loadingState, setLoadingState] = useState("Input ID");
  const [StarWarsData, setStarData] = useState(null);
  const [characterList, setCharList] = useState([]);
  const [homeworld, setHomeworld] = useState()
  const [climate, setClimate] = useState()
  const [created, setCreated] = useState()
  const [population, setPopulation] = useState()
  const [terrain, setTerrain] = useState()



  function renderData() {
    if (loadingState === "Failed!" || loadingState === "Input ID" || loadingState === "Loading..." || StarWarsData === null) {
        console.log(loadingState)
    } else {
        const {name,height,mass,hair_color,eye_color} = StarWarsData;
        
        
        return (
        <div className="App">
            <p>Name: {name}</p>
            <p>Height: {height}</p>
            <p>Mass: {mass}</p>
            <p>Hair Color: {hair_color}</p>
            <p>Eye Color: {eye_color}</p>
            <p>Homeworld: {homeworld}</p>
          

            <button onClick={saveCharacter}>Save</button>
            <Title title="Saved"/>
            {characterList.map(({name, height, mass, hair_color, eye_color, }) => {          
                return <Character name={name} height={height} mass={mass} hair_color={hair_color} eye_color={eye_color} homeworld={homeworld} climate={climate} created={created} population={population} terrain={terrain}/>
            })}

            
        </div>
        );
    }
  }
  function saveCharacter() {
    const newList = [...characterList, StarWarsData]  
    setCharList(newList)
  }

    return (
      <div>
      <form
        onSubmit={ async (e) => {
          e.preventDefault();
              const url = `https://swapi.dev/api/people/${id}/`;
              try {
                  const res = await fetch(url);
                  const json = await res.json();
                  console.log(json);
                  
                  const {homeworld} = json
                  const responsetwo = await fetch(homeworld);
                  const json2 = await responsetwo.json();
        
                  console.log(json2)
                  // const {climate, name } = json2
                  setHomeworld(json2.name);
                  setClimate(json2.climate);
                  setCreated(json2.created);
                  setPopulation(json2.population)
                  setTerrain(json2.terrain)
                  setStarData(json);
                  setLoadingState("Success!");


              } finally {    
              }
        }}
      >
        <input value={id} onChange={(e) => setId(e.target.value)} type="text" />
        <button type="submit">Submit</button>
      </form>
      {renderData()}
      </div>


    );
}

export default StarWars;