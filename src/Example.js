import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useState, useEffect } from "react";
function BasicExample({ persons, item, totalcallback, total, idx }) {
  const [active, setactive] = useState([]);
  useEffect(() => {
    const newactive = active.filter((activeperson) =>
      persons.includes(activeperson)
    );
    setactive([...newactive]);
    console.log("person changed");
  }, [persons]);

  useEffect(() => {
    if (idx === 0) {
      console.log("total");
      console.log(total);
      console.log("total active");
      console.log(active);
    }
    let array1 = total[idx];
    let array2 = active;
    let condition = array1 === undefined || array2 === undefined;
    if (condition === false) {
      condition =
        array1.length === array2.length &&
        array1.every((value, index) => value === array2[index]);
    }
    if (total.length !== 0 && !condition) {
      var temp = [...total];
      temp[idx] = [...active];
      console.log("temp");
      console.log(temp);
      console.log(active);
      const call = async ()=>{
        await totalcallback( elem =>{
           const newarray = [...elem]
           newarray[idx] = [...active]
           return newarray
        } );
      }
      call()
    }
  }, [active]);

  return item === undefined ? (
    <div></div>
  ) : (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item["image"]} />
      <Card.Body>
        <Card.Title>{item["name"]}</Card.Title>
        <Card.Text>{item["price"]}</Card.Text>
      </Card.Body>
      <div>
        <div>
          <label className="switch">
            <input
              onClick={(e) => {
                e.target.checked ? setactive([...persons]) : setactive([]);
              }}
              type="checkbox"
            />
            <span className="slider round"></span>
          </label>
        </div>
        {persons.map((person) => {
          return active.includes(person) ? (
            <button
              key={person}
              value={person}
              onClick={(e) => {
                setactive((person) =>
                  person.filter((value) => value !== e.target.value)
                );
              }}
              className="hoverbutton dark"
            >
              {person}{" "}
            </button>
          ) : (
            <button
              key={person}
              value={person}
              onClick={(e) => {
                setactive([...active, e.target.value]);
              }}
              className="hoverbutton light"
              style={{}}
            >
              {person}{" "}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
function SearchBar() {
  return (
    <div>
      <input></input>{" "}
    </div>
  );
}

export default BasicExample;
