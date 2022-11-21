import React, { createContext, useState } from "react";
export const ContexStore = createContext();

const Context = (props) => {
  const [ispopUp, setispopUp] = useState(false);

  return (
    <>
      <ContexStore.Provider
        value={{
          modal: [ispopUp, setispopUp],
        }}
      >
        {props.children}
      </ContexStore.Provider>
    </>
  );
};

export default Context;
