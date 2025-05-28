import { createContext, useContext, useState } from "react";

const SelectContext = createContext();

const Select = ({ children }) => {
  const [selected, setSelected] = useState(null);

  return (
    <SelectContext.Provider value={{ selected, setSelected }}>
      <div className="border p-4 rounded">{children}</div>
    </SelectContext.Provider>
  );
};

const Option = ({ children, value }) => {
  const { setSelected } = useContext(SelectContext);

  return (
    <div
      onClick={() => setSelected(value)}
      className="cursor-pointer hover:bg-gray-100 p-2"
    >
      {children}
    </div>
  );
};

Select.Option = Option;

export default Select;
