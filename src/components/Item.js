import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { personitemListContext } from "../App";

import { useState, useEffect } from "react";
export const Item = ({
  item,
  GlobalActivePersonsIds,
  value,
  allPersons,
  personItemList,
  setPersonItemList,
}) => {
  const [taxable, setTaxable] = useState(false);
  const [checked, setChecked] = useState(false);

  const [localActivePersons, setLocalActivePersons] = useState([]);
  function checkIfAllAreActive() {
    if (GlobalActivePersonsIds.length === 0) {
      return;
    }
    const allPersonsAreActive = GlobalActivePersonsIds.every((person) =>
      localActivePersons.includes(person)
    );

    if (allPersonsAreActive && !checked) {
      setChecked(true);
    } else if (!allPersonsAreActive && checked) {
      setChecked(false);
    }
  }

  useEffect(() => {
    setPersonItemList((personItemList) => {
      const newpersonItemList = [...personItemList];
      newpersonItemList[value] = { tax: taxable, id: [...localActivePersons] };
      return newpersonItemList;
    });
  }, [localActivePersons, taxable]);

  /// Check if all persons are active
  useEffect(() => {
    checkIfAllAreActive();
  }, [localActivePersons]);

  useEffect(() => {
    if (checked) {
      setLocalActivePersons([...GlobalActivePersonsIds]);
    } else {
      // if there is any local person that is not in global active persons
      // then remove it
      let changed = localActivePersons.find((person) => {
        return !GlobalActivePersonsIds.includes(person);
      });
      if (changed) {
        setLocalActivePersons((localActivePersons) => {
          const newlocalActivePersons = localActivePersons.filter((person) =>
            GlobalActivePersonsIds.includes(person)
          );
          return newlocalActivePersons;
        });
      }
    }
  }, [GlobalActivePersonsIds]);

  return (
    <React.Fragment>
      {item ? (
        <div className="border-solid border flex items-center p-4  shadow-md rounded-md gap-3 ">
          <div className="">
            <img className="w-20 h-20 " src={item["image"]} />
          </div>
          <div className="w-full">
            <div>
              <div className="font-bold">{item["name"]}</div>
              <div className="font-bold">
                {item["price"]} {taxable ? `+` + calculateTax(item) : ""}
              </div>
              <div className="flex items-center justify-end my-4">
                <div>Tax? &nbsp;</div>
                <label className="switch switch-small mr-2">
                  <input
                    onClick={(e) => {
                      setTaxable(e.target.checked);
                    }}
                    type="checkbox"
                  />
                  <span className="slider slider-small round"></span>
                </label>
                <div> Select all? </div>

                <label className="switch switch-small">
                  <input
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      if (e.target.checked) {
                        setLocalActivePersons([...GlobalActivePersonsIds]);
                      } else {
                        setLocalActivePersons([]);
                      }
                    }}
                    type="checkbox"
                    checked={checked}
                  />
                  <span className="slider slider-small round"></span>
                </label>
              </div>
              <div>
                {GlobalActivePersonsIds.map((person) => {
                  return localActivePersons.includes(person) ? (
                    <button
                      key={person}
                      value={person}
                      onClick={(e) => {
                        setLocalActivePersons((person) =>
                          person.filter((value) => value !== e.target.value)
                        );
                      }}
                      className=" dark mr-2 px-2 py-1 mb-2 font-medium w-24"
                    >
                      {allPersons.get(person)}{" "}
                    </button>
                  ) : (
                    <button
                      key={person}
                      value={person}
                      onClick={(e) => {
                        setLocalActivePersons([
                          ...localActivePersons,
                          e.target.value,
                        ]);
                      }}
                      className=" light mr-2 px-2 py-1 mb-2 hover:bg-gray-100 font-medium w-24"
                      style={{}}
                    >
                      {allPersons.get(person)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
};

const calculateTax = (item) => {
  const tax = parseFloat(item["price"]) * 0.0825;
  return tax.toFixed(2);
};
