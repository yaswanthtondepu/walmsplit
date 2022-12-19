import React from 'react'

const TotalBox = ({ items, persons, partitions }) => {
    console.log("main active")
    console.log(persons)
    const eachprice = {}
    partitions.forEach((partition, idx) => {
        partition.forEach((person) => {
            if (eachprice.hasOwnProperty(person)) {
                eachprice[person] += parseFloat((parseFloat(items[idx]["price"]) / partition.length).toFixed(4))
            }
            else {
                eachprice[person] = parseFloat((parseFloat(items[idx]["price"]) / partition.length).toFixed(4));
            }
        })
    });
    var total = 0;
    for (var key in eachprice) {
        total += eachprice[key]
    }
    var itemnames = []
    var itemprices = []
    for (var key in eachprice) {
        itemnames.push(key)
        itemprices.push(eachprice[key])
    }
    console.log(itemnames)
    console.log(total)
    return <div
        style={{ boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 12px", width: "200px", padding:"1rem" }}>

        {itemnames.map((item, idx) => {
            console.log(itemnames[idx])
            return <div key={itemnames[idx]}> {itemnames[idx]} : {itemprices[idx]}</div>
        })}

        <div key="total">{"total"} : {total}</div>
    </div>
}

export default TotalBox