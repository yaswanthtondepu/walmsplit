import React from 'react'

const TotalBox = ({ items, persons, partitions }) => {
    console.log("main active")
    console.log(persons)
    console.log(items)
    const eachprice = {}
    partitions.forEach((partition, idx) => {
        partition.forEach((person) => {
            var itemprice = parseFloat(items[idx]["price"]) + parseFloat(items[idx]["tax"])
            if (eachprice.hasOwnProperty(person)) {

                eachprice[person] += parseFloat((itemprice / partition.length).toFixed(4))
            }
            else {
                eachprice[person] = parseFloat((itemprice / partition.length).toFixed(4))
            }
        })
    });
    let total = 0;

    for (var key in eachprice) {
        console.log(eachprice[key])
        total += eachprice[key]
    }
    var itemnames = []
    var itemprices = []
    for (var key1 in eachprice) {
        itemnames.push(key1)
        itemprices.push(eachprice[key1])
    }
    console.log(itemnames)
    console.log(total)
    return <div
        style={{ boxShadow: " rgba(0, 0, 0, 0.1) 0px 4px 12px", width: "300px", padding: "1rem" }}>

        {itemnames.map((item, idx) => {
            console.log(itemnames[idx])
            return <div key={itemnames[idx]}> {itemnames[idx]} : {itemprices[idx]}</div>
        })}

        <div key="total">{"total"} : {total}</div>
    </div>
}

export default TotalBox