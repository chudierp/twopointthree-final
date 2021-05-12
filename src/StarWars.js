
import React, { useState } from "react";
import Title from "./Title";
import Character from "./Character"
import { data } from "browserslist";


function StarWars(props) {
  const [id, setId] = useState(1);
  const [loadingState, setLoadingState] = useState("Input ID");
  const [StarWarsData, setStarData] = useState(null);
  const [characterList, setCharList] = useState([]);
  const [homeworld, setHomeworld] = useState()
  

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
            {characterList.map(({name, height, mass, hair_color, eye_color}) => {          
                return <Character name={name} height={height} mass={mass} hair_color={hair_color} eye_color={eye_color} homeworld={homeworld}/>
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
                  const res2 = await fetch(homeworld);
                  const json2 = await res2.json();
                  console.log(json2)
                  setHomeworld(Object.entries(json2));
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