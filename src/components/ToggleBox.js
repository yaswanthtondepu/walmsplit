import React from 'react'

const ToggleBox = ({ persons, activecallback, active }) => {
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
  )
}

export default ToggleBox