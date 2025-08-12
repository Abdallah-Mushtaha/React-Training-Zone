import WeatherApp from "./Components/WeatherApp.jsx";
import StateProvider from "./context/StateContext.jsx";

export default function App() {
  return (
    <>
      <StateProvider>
        <WeatherApp />
      </StateProvider>
    </>
  );
}
