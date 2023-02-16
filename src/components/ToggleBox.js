import React from "react";

const ToggleBox = ({ allPersons, activePersonsHandler, activePersons }) => {
  const children = [];

  allPersons.forEach((name, id) => {
    if (activePersons.includes(id.toString())) {
      children.push(
        <button
          value={id}
          onClick={(e) =>
            activePersonsHandler((activepersonids) =>
              activepersonids.filter((id) => id !== e.target.value)
            )
          }
          className="hoverbutton dark"
          key={id}
        >
          {name}
        </button>
      );
    } else {
      children.push(
        <button
          value={id}
          onClick={(e) =>
            activePersonsHandler((activepersonids) => [
              ...activepersonids,
              e.target.value,
            ])
          }
          className="hoverbutton light"
          key={id}
        >
          {name}
        </button>
      );
    }
  });

  return <div className="mt-2">{children}</div>;
};

export default ToggleBox;
