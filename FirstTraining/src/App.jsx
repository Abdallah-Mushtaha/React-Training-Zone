import {
  act,
  createContext,
  createElement,
  use,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";

function DeletButton({ id }) {
  const { DeletUSer } = useContext(GlobaleState);
  return (
    <button
      onClick={() => {
        DeletUSer(id);
      }}
    >
      DeletUser
    </button>
  );
}

//Functional component
let User = ({ id, name, age }) => {
  // console.log(props); // its an object  so can use object destructuring
  const { dispatch } = useContext(GlobaleState);
  useEffect(() => {
    return () => {
      // console.log("user component is unmounted its clean up function ");
      // setAdmin(null);
      dispatch({ type: "setAdmin", payload: { admin: null } });
    };
  }, []);

  return (
    <li style={{ margin: "5rem" }}>
      <h2>{name}</h2>
      <h4>{age}</h4>
      <button
        onClick={() => {
          dispatch({ type: "setAdmin", payload: { admin: name } });
          console.log(`${name} is admin now`);
        }}
      >
        Set Admin
      </button>

      <DeletButton id={id} />
    </li>
  );
};

let usersDefult = [
  {
    id: 1,
    name: "Abood",
    age: 20,
  },
  {
    id: 2,
    name: "Ali",
    age: 30,
  },
  {
    id: 3,
    name: "Omar",
    age: 40,
  },
];

const stateInitial = { Admin: null, likes: 0, users: usersDefult };

function reducer(state, action) {
  switch (action.type) {
    case "setAdmin":
      return { ...state, Admin: action.payload.admin };
    case "setLikes":
      console.log("YOU HAVE   likes number :: ", state.likes + 1);

      return { ...state, likes: state.likes + 1 };
    case "deletUser":
      let newUsers = state.users.filter((user) => {
        return user.id !== action.payload.userID;
      });
      return { ...state, users: newUsers };
    default:
      return state;
  }
}

const GlobaleState = createContext();

export function Provider({ children }) {
  // بنحط بداخله البيانات ال بدنا نمررها
  const [state, dispatch] = useReducer(reducer, stateInitial);

  const DeletUSer = useCallback((id) => {
    dispatch({ type: "deletUser", payload: { userID: id } });
  }, []);

  let value = useMemo(() => {
    return { state, dispatch, DeletUSer };
  }, [state]);

  return (
    <GlobaleState.Provider value={value}>{children}</GlobaleState.Provider>
  );
}

// **********************(Main component)********************

//Main component
export function App() {
  const { state, dispatch } = useContext(GlobaleState);

  const useRe = useRef(null);
  useEffect(() => {
    if (state.Admin) {
      document.title = `${state.Admin} is Admin Now`;
      console.log("useEffect is going crazy ?? ");
    } else document.title = "React App  Admin now ";
  }, [state.Admin]);

  //run only once
  useEffect(() => {
    console.log("fetching data from server");
    // let like = document.getElementById("like");
    // console.log(like);
    console.log((useRe.current.style.color = "red"));
  }, []);

  return (
    <>
      <h2>How is Admin Now ??{state.Admin} </h2>
      {state.users.map((user) => {
        return (
          <User id={user.id} name={user.name} age={user.age} key={user.name} />
        );
      })}
      <div id="like" ref={useRe}>
        {state.likes}
      </div>
      <button
        onClick={() => {
          dispatch({ type: "setLikes" });
        }}
      >
        click likes
      </button>
    </>
  );
}
