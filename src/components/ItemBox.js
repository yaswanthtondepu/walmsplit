import React from "react";
import Input from "./scrap";
import { personitemListContext } from "../App";
import { Item } from "./Item";
import { useState, useEffect } from "react";
export const ItemBox = ({ GlobalActivePersonsIds,items,setItems,allPersons,personItemList,setPersonItemList }) => {



  useEffect(() => {
    console.log(personItemList)
    if (items.length != personItemList.length){
    const newpersonItemList = items.map((item) => { return {"tax":false,"ids":[]}   });
    setPersonItemList(newpersonItemList);}
  }, [items]);
  return (
    <div>
      {items.length !== 0 ? (
        <div
         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
         
        >
          {items.map((item, idx) => {
            return (
              <div className="m-11 h-full  ">
                <Item 
                  item={item}
                  allPersons={allPersons}
                  GlobalActivePersonsIds={GlobalActivePersonsIds}
                  value={idx}
                  personItemList={personItemList}
                  setPersonItemList={setPersonItemList}
                ></Item>
              </div>
            );
          })}
        </div>
      ) : ( 
        <Input itemsHandler={setItems}></Input>
      )}
    </div>
  );
};
