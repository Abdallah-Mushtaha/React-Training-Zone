import { useEffect, useRef, useState } from "react";

export default function Post() {
  const Api = "https://jsonplaceholder.typicode.com"; // API URL
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // State to hold loading status
  const [error, setErorr] = useState(false); // we dont care about the Type of Error we just want to know if there is an error or not
  const [page, setPage] = useState(0);

  const AbortControllRef = useRef(null);

  //  Fetch posts from the API because irs side effect
  useEffect(() => {
    //  Function to fetch posts from the API why ?? because its side effect and asynchronous will  use async await
    const fetchPosts = async () => {
      AbortControllRef.current?.abort();
      AbortControllRef.current = new AbortController();
      setLoading(true); // Set loading to true before fetching data

      try {
        const response = await fetch(`${Api}/posts?${page}`, {
          signal: AbortControllRef.current.signal,
        }); // Fetch posts from the API
        const data = await response.json(); // Parse the response as JSON to get the data as Array of objects to act with it
        setPosts(data); // Set the posts in the state
        setErorr(false); // Set error to false if fetching succeeds
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        } else {
          setErorr(true); // Set error to true if fetching fails
        }
      } finally {
        // IF we forgot to set the loading to false after fetching the data if there is an error or not the app will be stuck in the loading state forever and the user will not be able to see the data
        setLoading(false); // Set loading to false after fetching data
      }
      // By The way If u use Axios u dont need to parse the response as JSON because it does it for u
      // console.log(data); // Log the data to the console
    };
    fetchPosts(); // Call the function to fetch posts
  }, [page]); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold  text-teal-600 py-4 mb-5 ">
        Data Fetching in React
      </h1>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
        className="btn cursor-pointer block bg-teal-300 rounded-md float-end p-5 outline-none border-none "
      >
        AnotherRequset :: {page}
      </button>
      <ul>
        {loading ? (
          <div className="spinner-container flex justify-center items-center h-100">
            <div className="spinner "></div>
          </div>
        ) : error === true ? (
          <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-10">
            <img
              src="public/giphy.gif"
              alt="Erorr"
              className="mx-auto w-1/2 object-fit-cover"
            />
          </div>
        ) : (
          posts.map((post) => {
            return (
              <li
                key={post.id}
                className="mb-4 p-4 bg-white rounded-lg shadow-md "
              >
                <h2 className="text-md font-bold ">{post.title}</h2>
                <p className="text-gray-600 my-3">{post.body}</p>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

/*

 #####  Achievements #####

 1. Created a functional component called Post that fetches data from an API and displays it in a styled list.
 2. Used the useEffect hook to fetch data when the component mounts.
 3. Utilized the useState hook to manage the state of the fetched posts.
 4. Styled the component using Tailwind CSS classes for a clean and modern look.

 Now This is a simple example of data fetching in React , now when we Refresh the page will see clear page 
 until the data is fetched and then it will show the data in a list format with a title and body of each post.


but this is not the best way to do it because we are fetching the data every time we refresh the page and this is not a good practice because it will slow down the app and make it less responsive and the user Not understand what is going on and this is not a good user experience.


so we need to tell the user that something is loading and we need to show like a loading spinner or something like that .

so we will use loading state to show something is loading after and before the data Fetching is done.
as u see we have a preef  time before Fetching the data 


another thinges some times when we fetching the data or convert it to  somthing that we whant to use maybe the Fetching process Failed, OR users lose their internet connection   so we need to handle this case and show some error message to the user or something like that or anything else.


now u can see that the Data will Fetch and will never Fire Again , because the dependency array is empty so the useEffect will only run once after the initial render
but the truth is in alote of Application u request do fire multiple Time  acoording to the dependency.
For Example pagenation because u dont want to show all posts at once may be u have  1000 of posts 
in this case may be the  nice idea to branch theim to 10or 20 posts if u do that will do multiple 
requests one request to each page loading the spasipich chank of posts and if u do that "multiple requests"
u will open to your self to having some rashCondition  problem and very strange bug can be realy hard to debug .

 Example to see it , Refrash page by new request the isuss is that when do new request the previus request will be pending  that called RaceCondition that their is new request and the prev request still work not finshing yet 
 so we need to solve this problem by using abortController to cancel the prev request and start a new one.

 what is AbortController ??
 its a way to cancel a request when we dont need it anymore. 
 the way from javaScript to cancel a request is to use the AbortController class.

 Traditionaly when cancel a request  we got an Error so we need to handel this error to avoid Error ui 
 when cancel the prev request  (error.name === "AbortError") do somthings like  console.log("Aborted");

 u can see the new Request and the prev by inspecting the network tab in the browser.
 */
