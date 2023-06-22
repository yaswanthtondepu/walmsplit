import React from "react";
import { useState, useEffect } from "react";
import ToggleBox from "../components/ToggleBox";
import { ItemBox } from "../components/ItemBox";
import TotalBox from "../components/TotalBox";
import Nav from "../components/Nav";
import Search from "../components/Search";
import { ThreeDots } from 'react-loader-spinner'
import Select from 'react-select'
import BackDrop from '../components/BackDrop'
import PayerShares from "../components/PayerShares";


var axios = require("axios");
export const HomePage = () => {
  const [allPersons, setAllPersons] = useState(new Map());
  const [filteredPersons, setFilteredPersons] = useState(new Map());
  const [searchPerson, setSearchPerson] = useState("");
  // stores id of all active persons
  const [GlobalActivePersonsIds, setGlobalActivePersonsIds] = useState([]);
  const [personItemList, setPersonItemList] = useState([]);
  const [items, setItems] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showGroups, setShowGroups] = useState(false);
  const [groupsSelectOptions, setGroupsSelectOptions] = useState([]);
  const [payerSelectOptions, setPayerSelectOptions] = useState([]);
  const [payer, setPayer] = useState([]);
  const [taxPercentage, setTaxPercentage] = useState(8.25);
  const fgSelect = [{ value: "friends", label: "Friends" }, { value: "groups", label: "Groups" }]
  const [payersAndShares, setPayersAndShares] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const access_token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : " ";
  //to get query params
  useEffect(() => {
    getFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token]);

  const getFriends = () => {
    if (allPersons.size === 0) {
      setShowLoader(true);
      axios
        .get(`${process.env.REACT_APP_URL}/get_friends`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res, err) => {
          if (res) {
            setAllPersons((persons) => {
              const newpersons = new Map(persons);
              res.data.forEach((person) => {
                newpersons.set(person.id.toString(), person.name);
              });
              return newpersons;
            });
            setFilteredPersons((persons) => {
              const newpersons = new Map(persons);
              res.data.forEach((person) => {
                newpersons.set(person.id.toString(), person.name);
              });
              return newpersons;
            });
            setShowLoader(false);
          }
          if (err) { console.log(err); setShowLoader(false); };
        })
        .catch((err) => {
          setShowLoader(false);
        });

      axios
        .get(`${process.env.REACT_APP_URL}/get_current_user`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res, err) => {
          if (res) {
            setAllPersons((persons) => {
              const newpersons = new Map(persons);
              newpersons.set(res.data.id.toString(), res.data.name + " (You)");
              return newpersons;
            });
            setFilteredPersons((persons) => {
              const newpersons = new Map(persons);
              newpersons.set(res.data.id.toString(), res.data.name + " (You)");
              return newpersons;
            });

          }
          if (err) console.log(err);
        });
    }
  };

  useEffect(() => {
    if (payer.length > 0 && GlobalActivePersonsIds.length > 0) {
      setPayer([{ value: GlobalActivePersonsIds[0], label: allPersons.get(GlobalActivePersonsIds[0].toString()) }])
    }

    let options = GlobalActivePersonsIds.map((id) => {
      return { value: id, label: allPersons.get(id.toString()) }
    })
    setPayerSelectOptions(options);

    //remove payerIds not in GlobalActivePersonsIds

    // console.log(newPayer);
    console.log(payer);
    console.log(payer.length, GlobalActivePersonsIds.length);
    if (payer.length === 0 && GlobalActivePersonsIds.length > 0) {
      setPayer([{ value: GlobalActivePersonsIds[0], label: allPersons.get(GlobalActivePersonsIds[0].toString()) }])
    }
    else if (payer.length > 0 && GlobalActivePersonsIds.length > 0) {
      let newPayer = payer.filter((p) => GlobalActivePersonsIds.includes(p.value))
      setPayer(newPayer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GlobalActivePersonsIds, allPersons])


  const getGroups = () => {
    if (groups.length !== 0) return;
    setShowLoader(true);
    axios
      .get(`${process.env.REACT_APP_URL}/get_groups`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res, err) => {
        if (res) {
          setGroups(res.data);
          const options = res.data.map((group) => {
            return { value: group.id, label: group.name }
          })
          setGroupsSelectOptions(options);
        }
        if (err) { console.log(err); };
        setShowLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setShowLoader(false);
      });

  };

  useEffect(() => {

    const tax = taxPercentage ? parseFloat(taxPercentage) : 0;
    console.log(tax);
    let totalTax = 0;
    const expenses = new Map();
    GlobalActivePersonsIds.forEach((id) => {
      expenses.set(id, 0);
    });
    personItemList.forEach((Item, idx) => {
      const itemprice =
        parseFloat(items[idx].price) +
        (Item.tax ? parseFloat(items[idx].price) * (tax / 100) : 0);
      totalTax += Item.tax ? parseFloat(items[idx].price) * (tax / 100) : 0;
      console.log(idx, itemprice.toFixed(2));
      console.log(expenses);
      const prices = splitEqual(
        parseFloat(itemprice.toFixed(2)),
        Item.id.length
      );
      console.log(prices);
      const sortedExpenses = new Map(
        [...expenses.entries()].sort((a, b) => a[1] - b[1])
      );
      console.log(sortedExpenses);
      sortedExpenses.forEach((value, id) => {
        console.log(value, id);
        if (Item.id.includes(id)) {
          let temp = parseFloat((expenses.get(id) + prices[0]).toFixed(2));
          expenses.set(id, temp);
          prices.shift();
        }
      });
    });
    console.log(expenses, Object.fromEntries(expenses), totalTax.toFixed(2));
    const array = Array.from(expenses, ([name, value]) => value);
    if (array.length > 0) {
      console.log(array.reduce((a, b) => a + b, 0).toFixed(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personItemList, taxPercentage]);

  // for search
  useEffect(() => {
    if (searchPerson) {
      const filtered = new Map();
      allPersons.forEach((name, id) => {
        if (name.toLowerCase().includes(searchPerson.toLowerCase())) {
          filtered.set(id, name);
        }
      });
      setFilteredPersons(filtered);
    }
    else {
      setFilteredPersons(allPersons);
    }

  }, [searchPerson, allPersons]);

  const clearSearchHandler = () => {
    if (searchPerson) {
      setSearchPerson("");
    }
  }
  const handleSelectChange = (e) => {
    if (e.value === "friends") {
      setFilteredPersons(allPersons);
      setShowGroups(false);
    } else {
      getGroups();
      // setAllPersons(new Map());
      setFilteredPersons(new Map());
      setShowGroups(true);
    }
  };

  const handleGroupSelectChange = (e) => {
    const group = groups.find((group) => group.id === parseInt(e.value));
    console.log(group);
    const persons = new Map();
    group.members.forEach((member) => {
      persons.set(member.id.toString(), member.name);
    });
    // setAllPersons(persons);
    setFilteredPersons(persons);
  };

  useEffect(() => {

    // payersAndShare = [{id:number, share:number}]
    //payer = [{value:number, label:string}]
    //check payersAndShares: remove the ones not in payer
    let newPayersAndShares = payersAndShares.filter((p) => payer.map((p) => p.value).includes(p.id))
    //check payersAndShares: add the ones that are not in payersAndShares from payer
    payer.forEach((p) => {
      if (!payersAndShares.map((p) => p.id).includes(p.value)) {
        newPayersAndShares.push({ id: p.value, share: 0.0 })
      }
    })
    console.log(newPayersAndShares);
    //set payersAndShares
    setPayersAndShares(newPayersAndShares)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payer])

  const handlePayerSelectChange = (e) => {
    if (e.length === 0 && GlobalActivePersonsIds.length > 0) {
      setPayer([{ value: GlobalActivePersonsIds[0], label: allPersons.get(GlobalActivePersonsIds[0]) }])
    }
    else {
      setPayer(e)
    }
  };
  return (
    <div>
      <Nav />
      <div
        className="flex justify-around  pl-4"
      // style={{ height: "calc(100vh - 3.5rem) " }}
      >
        {" "}
        <div style={{ height: "calc(100vh - 95px) ", overflowY: "auto", flexBasis: "82%" }} className="scroll">
          <div className="flex flex-col md:flex-row">
            <div className="grow">
              <Search setSearchPerson={setSearchPerson} searchPerson={searchPerson} />
            </div>
            {showShareModal && <div>
              <div onClick={() => {setShowShareModal(false)}}>
                <BackDrop/>
              </div>
              <PayerShares payer={payer}
                payersAndShares={payersAndShares}
                setPayersAndShares={setPayersAndShares}
                setShowShareModal={setShowShareModal} />
            </div>}
            <div className="flex-none mt-3">
              <span className="pr-5" ><strong>Tax:</strong></span>
              <input type="number"
                placeholder="Tax percentage"
                className="rounded-md w-3/4 md:w-1/2 h-10 pl-2 focus:outline-none"
                style={{ border: "1px solid black" }}
                onChange={(e) => {
                  let value = e.target.value;
                  if (value < 0) {
                    value = 0;
                  }
                  if (value > 100) {
                    value = 100;
                  }
                  setTaxPercentage(value)
                }
                }
                value={taxPercentage} />
            </div>
          </div>

          {GlobalActivePersonsIds.length > 0 && <div className="mt-3 mb-3">
            <div><h6>Persons in split:</h6> </div>
            <div className="max-h-28 overflow-y-auto">
              {GlobalActivePersonsIds.map(id =>
                <span key={id} className="hoverbutton light">{allPersons.get(id.toString())}</span>
              )}
            </div>
          </div>}

          {GlobalActivePersonsIds.length > 0 &&
            <div className="flex flex-col">
              <div className="mt-3 mb-3">
                <span><strong>Who Paid?</strong></span>
                <Select options={payerSelectOptions}
                  onChange={handlePayerSelectChange}
                  isSearchable={true}
                  isClearable={false}
                  isMulti={true}
                  defaultValue={[...payer]}
                  value={[...payer]}
                  placeholder="Select Payer"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: 'black',
                      width: "300px",
                      cursor: "pointer",
                      outline: "none",
                    }),
                  }} />

                {payer.length > 1 && <div>
                  <button className="hoverbutton dark" onClick={() => setShowShareModal(true)}>Set Shares</button>
                </div>}
              </div>

              <div>
                {payer.length > 1 && <div className="mt-3 mb-3">
                  <div><h6>Shares:</h6> </div>
                  <div className="max-h-28 overflow-y-auto ">
                    {payersAndShares.map((p) =>
                      <span key={p.id} className="hoverbutton light">{allPersons.get(p.id.toString())} : {p.share}</span>
                    )}
                  </div>
                  </div>}
              </div>
            </div>}

          <div className="mt-3 mb-3">
            <Select options={fgSelect}
              onChange={handleSelectChange}
              isSearchable={false}
              defaultValue={fgSelect[0]}
              placeholder="Friends / Groups"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: 'black',
                  width: "250px",
                  cursor: "pointer",
                  outline: "none"
                }),
              }} />

          </div>

          {showGroups && <div className="mt-3 mb-3">
            {/* <select title="groups" onChange={handleGroupSelectChange}
              defaultValue={0}
              style={{ border: "1px solid black", borderRadius: "5px", width: "250px", cursor: "pointer", padding: "5px 10px" }}>
              <option key={0} value={0} disabled  >Select Group</option>
              {groups.map(group =>
                <option key={group.id} value={group.id}>{group.name}</option>
              )};
            </select> */}

            <Select options={groupsSelectOptions}
              onChange={handleGroupSelectChange}
              isSearchable={true}
              placeholder="Select a Group"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: 'black',
                  width: "250px",
                  cursor: "pointer",
                  outline: "none"
                }),
              }}
            />
          </div>}

          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#000"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={showLoader}
          />
          <ToggleBox
            allPersons={filteredPersons}
            activePersonsHandler={setGlobalActivePersonsIds}
            activePersons={GlobalActivePersonsIds}
            clearSearchHandler={clearSearchHandler}
          ></ToggleBox>
          <ItemBox
            items={items}
            allPersons={allPersons}
            setItems={setItems}
            GlobalActivePersonsIds={GlobalActivePersonsIds}
            personItemList={personItemList}
            setPersonItemList={setPersonItemList}
          />
        </div>
        <TotalBox
          GlobalActivePersonsIds={GlobalActivePersonsIds}
          personItemList={personItemList}
          items={items}
          allPersons={allPersons}
          taxPercentage={taxPercentage}
          payersAndShares={payersAndShares}
        />
      </div>
    </div>
  );
};

function splitEqual(price, quantity) {
  const ans = [];
  const transformedprice = Math.round(price * 100);
  let individualprice = Math.floor(transformedprice / quantity);
  for (let i = 0; i < quantity; i++) {
    ans.push(individualprice);
  }

  const extraprice = transformedprice - individualprice * quantity;
  for (let i = 0; i < extraprice; i++) {
    ans[i] += 1;
  }
  return ans.map((price) => price / 100);
}
