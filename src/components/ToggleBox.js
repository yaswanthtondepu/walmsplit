import React from "react";

const ToggleBox = ({ allPersons, activePersonsHandler, activePersons, clearSearchHandler }) => {
  const children = [];

  allPersons.forEach((name, id) => {
    if (activePersons.includes(id.toString())) {
      children.push(
        <button type="button"
          value={id}
          onClick={(e) => {
            activePersonsHandler((activepersonids) =>
              activepersonids.filter((id) => id !== e.target.value)
            );
            clearSearchHandler();
          }

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
          onClick={(e) => {
            activePersonsHandler((activepersonids) => [
              ...activepersonids,
              e.target.value,
            ]);
            clearSearchHandler();
          }
          }
          className="hoverbutton light"
          key={id}
        >
          {name}
        </button>
      );
    }
  });

  return <div className="mt-2 max-h-60 overflow-y-auto ">{children}</div>;
};

export default ToggleBox;
