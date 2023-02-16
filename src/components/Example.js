import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useState, useEffect } from "react";
function BasicExample({ persons, item, totalcallback, total, idx, setitems }) {
  const [active, setactive] = useState([]);
  const [checked, setchecked] = useState(false);
  const [taxable, setTaxable] = useState(false);
  useEffect(() => {
    if (checked) {
      setactive([...persons])
    }
    else {
      const newactive = active.filter((activeperson) =>
        persons.includes(activeperson)
      );
      setactive([...newactive]);

    }

  }, [persons]);
  useEffect(() => {
    checked ? setactive([...persons]) : setactive([]);
  }, [checked])

  useEffect(() => {
    if (taxable) {
     setitems((items) => {
        
        const newitems = [...items];
        newitems[idx]["tax"] = calculateTax();
        console.log("hello"+calculateTax())
        return newitems;
      });
    } else {
      setitems((items) => {
        const newitems = [...items];
        newitems[idx]["tax"] = 0;
        return newitems;
      });
      
    }
  }, [taxable]);

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
      const call = async () => {
        await totalcallback(elem => {
          const newarray = [...elem]
          newarray[idx] = [...active]
          return newarray
        });
      }
      call()
    }
  }, [active]);

  const calculateTax = () => {
    const tax = parseFloat(item["price"]) * 0.0825;
    return tax.toFixed(2);
  }

  return item === undefined ? (
    <div></div>
  ) : (
    <Card style={{ width: "12rem", padding: "1rem" }}>

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems:"center" }}>
        Tax? &nbsp;
        <label className="switch switch-small">

          <input
            onClick={(e) => {
              setTaxable(e.target.checked);
            }}
            type="checkbox"
          />
          <span className="slider slider-small round"></span>
        </label>
      </div>
      <Card.Img variant="top" src={item["image"]} />
      <Card.Body>
        <Card.Title>{item["name"]}</Card.Title>
        {console.log(item["price"])}
        <Card.Text>{item["price"]}  {taxable? `+`+ calculateTax():""}</Card.Text>
      </Card.Body>
      <div>
        <div>
          <label className="switch">
            <input
              onClick={(e) => {
                setchecked(e.target.checked);

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
