import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const StudentsContext = createContext();

const { Provider } = StudentsContext;

export function HookProvider({ children }) {
  const [markes, setMarkes] = useState(
    JSON.parse(localStorage.getItem("markes")) || []
  );
  const [Students, setStudents] = useState(
    JSON.parse(localStorage.getItem("Students")) || []
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("Students", JSON.stringify(Students));
  }, [Students]);

  useEffect(() => {
    localStorage.setItem("markes", JSON.stringify(markes));
  }, [markes]);

  //كل مره رح نعمل انكريمنت وديكرمين رح ينعمل ريندر
  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const DecrementCount = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);
  console.log("the counter rendering of Context ");
  // Because whenever the count value changes, a re-render will occur.
  // And we create a new object every time.
  // The solution is with
  // useMemo
  // I told her to change the object property inside it, not to change the entire object. If a change occurs to one of the dependencies, I see the same thing.
  // In the function, we will only use the
  // callback
  // This way, I can guarantee that the
  // optimizing for performance

  // useMemo => using for Array && object will re-render the component, but it will not create a new object.
  // UseCallback => using for function
  // This way, I have saved this code from the
  // unnisesary re-rendering
  // Because noneprimitve code
  const value = useMemo(
    // Here, it will change the object inside if a change occurs to the dependency. I see
    () => ({
      markes,
      setMarkes,
      Students,
      setStudents,
      count,
      incrementCount,
      DecrementCount,
    }),
    [markes, Students, count]
  );
  return <Provider value={value}>{children}</Provider>;
}
//My experience
// const value = useCallback(() => {
// return { Markes, setMarkes, Students, setStudents };
// }, [Markes, Students]);

// Interview Question
// function A({ C1 }) {}
// function B({ C2 }) {}

// export function C() {
// const [c1, setC1] = useState(0);
// const [c2, setC2] = useState(0);

// return (
// <>
// <A C1={c1} />
// <B C2={c2} />
// </>
// );
// }

// If we change C1, who will get the re-render?
//
// Normally, if the state changes, it will re-render the component it's in just because it was passed as a prop.
// I say the component should be
// A
// because the state was passed to it.
// The correct half answer is that
// A, C
// will both be re-rendered.
