import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import "./App.css";
import Input from "./components/scrap";
import { useState } from "react";
import BasicReact from "./components/Example";
import ToggleBox from "./components/ToggleBox";
import TotalBox from "./components/TotalBox";

//const axios = require("axios").default;
// const instance = axios.create({
//   baseURL: "https://finalspaceapi.com/api/v0/character/?limit=2",
//   withCredentials: true,
//   timeout: 1000,
// });

function App() {
  const persons = ["Divya", "Pooja", "Yash", "Maddy", "Bannu", "Sunil", "Sai", "Ramya", "Yaswanth"];
  const [mainActive, setmainActive] = useState([]);
  const [items, setitems] = useState([]);
  const [partition, setpartititon] = useState([])
  useEffect(() => {
    if (items.length !== partition.length){
    console.log("set partition running")
    setpartititon(items.map((item, idx) => {
      return []
    }))
  }



  }, [items, partition.length]);



return (
  <div>
    <Input itemcallback={setitems} />
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "2rem", padding: "0 0 0 30px" }}>
      <div style={{ flex: 1 }}>
        <ToggleBox
          persons={persons}
          activecallback={setmainActive}
          active={mainActive}
        ></ToggleBox>

        <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto", marginTop: "2rem", height: "calc(100vh - 250px)", overflow: "auto" }}>
          {items.map((item, idx) => {
            // console.log("running");
            return (
              <BasicReact mainActive={mainActive} total={partition} totalcallback={setpartititon} key={idx} idx={idx} item={item} persons={mainActive} setitems={setitems}></BasicReact>
            );
          })}
        </div>
      </div>
      <div>
        <TotalBox persons={mainActive} partitions={partition} items={items} />
      </div>
    </div>




  </div>
);
}

export default App;
