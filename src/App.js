import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "./App.css";
import Input from "./scrap";
import { useState } from "react";
import BasicReact from "./Example";
const axios = require("axios").default;
const instance = axios.create({
  baseURL: "https://finalspaceapi.com/api/v0/character/?limit=2",
  withCredentials: true,
  timeout: 1000,
});

function ToggleBox({ persons, activecallback, active }) {

  return (
    <div>
      {persons.map((person) => {
        return active.includes(person) ? (
          <button
            value={person}
            onClick={(e) =>
              activecallback((active) =>
                active.filter((value) => value !== e.target.value)
              )
            }
            className="hoverbutton dark"
            key={person}
          >
            {person}
          </button>
        ) : (
          <button
            value={person}
            onClick={(e) => activecallback([...active, e.target.value])}
            className="hoverbutton light"
            key={person}
          >
            {person}
          </button>
        );
      })}
    </div>
  );
}

function App() {
  const persons = ["Divya", "Pooja", "Yash","Maddy","Bannu","Sam","Sai","Ramya","Yashwanth"];
  const [mainActive, setmainActive] = useState([]);
  const [items,setitems] = useState([]);
  const [partition ,setpartititon] = useState([])
  useEffect(() => {
    setpartititon(items.map((item,idx)=>{
      return []
    }))
  }, [items]);

  return (
    <div>
      {/* {console.log("items")}
      {console.log(items)}
      {console.log("items")} */}
      {console.log("partitions")}
      {console.log(partition)}
      {console.log("partitions")}

      <Input itemcallback={setitems} />
      <ToggleBox
        persons={persons}
        activecallback={setmainActive}
        active={mainActive}
      ></ToggleBox>
      {items.map((item, idx) => {
        // console.log("running");
        return (
          <BasicReact mainActive={mainActive} total = {partition} totalcallback={setpartititon} key={idx} idx={idx} item={item} persons={mainActive}></BasicReact>
        );
      })}
      <TotalBox persons={mainActive} partitions={partition} items={items} />
    </div>
  );
}

function TotalBox({items,persons,partitions}){
  console.log("main active")
  console.log(persons)
  const eachprice = {}
  partitions.forEach((partition,idx) => {
    partition.forEach((person)=>{
      if(eachprice.hasOwnProperty(person)){
         eachprice[person]+= parseFloat(items[idx]["price"])/partition.length
      }
      else{
        eachprice[person] = parseFloat(items[idx]["price"]) / partition.length;
      }
    })
  });
  var total =0;
  for (var key in eachprice){
    total += eachprice[key]
  }
  var itemnames =[]
  var itemprices = []
  for (var key in eachprice){
    itemnames.push(key)
    itemprices.push(eachprice[key]) 
  }
  console.log(itemnames)
  console.log(total)
  return <div>
  
      { itemnames.map((item,idx)=>{
        console.log(itemnames[idx])
        return <div key={itemnames[idx]}> {itemnames[idx]} : {itemprices[idx]}</div>
      }) }

  <div key="total">{"total"} : {total}</div>
  </div>
}
export default App;
