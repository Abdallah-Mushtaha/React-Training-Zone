import { useEffect, useState } from "react";

export default function Post() {
  const Api = "https://jsonplaceholder.typicode.com/"; // API URL
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // State to hold loading status
  const [error, setErorr] = useState(false);

  //  Fetch posts from the API because irs side effect
  useEffect(() => {
    //  Function to fetch posts from the API why ?? because its side effect and asynchronous will  use async await
    const fetchPosts = async () => {
      setLoading(true); // Set loading to true before fetching data

      try {
        const response = await fetch(`${Api}/posts`); // Fetch posts from the API
        const data = await response.json(); // Parse the response as JSON to get the data as Array of objects to act with it
        setPosts(data); // Set the posts in the state
        setErorr(false); // Set error to false if fetching is successful
      } catch (error) {
        setErorr(true); // Set error to true if fetching fails
      } finally {
        // IF we forgot to set the loading to false after fetching the data if there is an error or not the app will be stuck in the loading state forever and the user will not be able to see the data
        setLoading(false); // Set loading to false after fetching data
      }
      // By The way If u use Axios u dont need to parse the response as JSON because it does it for u
      // console.log(data); // Log the data to the console
    };
    fetchPosts(); // Call the function to fetch posts
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold  text-teal-600 py-4 mb-5 ">
        Data Fetching in React
      </h1>
      <ul>
        {loading ? (
          <div className="spinner-container flex justify-center items-center h-100">
            <div className="spinner "></div>
          </div>
        ) : error === true ? (
          <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-10">
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXZtMTA4ajFkdDFpNDkxeWtqYjF1ajdleXpzaWE5c245Z20yNXRhcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UoeaPqYrimha6rdTFV/giphy.gif"
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


another thinges some times when we fetching the data or convert it to  somthing that we whant to use maybe the Fetching process Failed  so we need to handle this case and show some error message to the user or something like that or anything else.
 */
