import { createContext, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [myData, setMyData] = useState([]);

  return (
    <MyContext.Provider value={{ myData, setMyData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider };
export default MyContext;