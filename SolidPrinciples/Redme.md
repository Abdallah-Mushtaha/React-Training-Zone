# Solid Prrinciples

junor developer write code to find the solution to a problem ofen maintained unreadable code and un mentainable code.

senior developer focus on writeing clean code and mantainable code , "write less code " and focus on performance .

So to write Cleaner Code we have to follow the SOLID Principles.

SOLID Principles there are 5 Principles "5 Roles".

- S - Single Responsibility Principle

- O - Open Closed Principle

- L - Liskov Substitution Principle

- I - Interface Segregation Principle

- D - Dependency Inversion Principle

# Single Responsibility Principle SRP

Each component responsible for one responsibility "one job " only of the application
Lets asoume that we have a component for Blog application

so we should write acomponent for blog post and another component for blog comment
so we can add every thing in one commponent or we can sperate them in separate one

```
import { useState } from 'react';

function UsePostState(postData) {
  const [post, setPost] = useState(postData);
  const [newComment, setNewComment] = useState('');

  const handleLike = () => {
    setPost(prevPost => ({
      ...prevPost,
      likes: prevPost.likes + 1,
    }));
  };

  const handleComment = () => {
    if (newComment.trim() !== '') {
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, { author: 'Guest', content: newComment }],
      }));
      setNewComment('');
    }
  };

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={handleLike}>Like ({post.likes})</button>

      <div className="comments">
        <h2>Comments</h2>
        {post.comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.author}:</strong> {comment.content}
          </div>
        ))}
      </div>

      <div className="add-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleComment}>Submit</button>
      </div>
    </div>
  );
}`
```

```
function BlogPost({ postData }) {
  const { title, content, likes, comments } = postData;
  return (
    <div className="blog-post">
      <h1>{title}</h1>
      <p>{content}</p>
      <Likes likes={likes} />
      <CommentList comments={comments} />
      <CommentForm />
    </div>
  );
}

export default BlogPost;
```

# Open Closed Principle OCP

The component should be open for extension but closed for modification
can acheive this by using composition and props

```
function Button({ label, onClick, style }) {
  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  );
}
```

# Liskov Substitution Principle LSP

we can apply this with React design or Composition
Ract component dont have class passed inheritance relationship like traditional language OOP
LSP consept can be applied using composition and props

if u have button component and u create IconButton component or extend or composes the base component
u should be able to use IconButton component any where u use Button component

```
const Button = ({ children, onClick }) => (
<button onClick={onClick}>{children}</button>
);

const IconButton = ({ icon, children, ...props }) => (
  <Button {...props}>
    <span className="icon">{icon}</span>
    {children}
  </Button>
);

```

# Interface Segregation Principle ISP

mean client should not be forced to depend on methods it does not use

```
function UserForm({ username, email, style, onCancel, onUserSubmit }) {
  return (
    <form onSubmit={onUserSubmit}>
      {/* Render form fields for username and email */}
    </form>
  );
}
```

here Component shoud not have props that it does not used
suppose we have Diffrent Formes Each Form have diffrent props so shoud be seperated

```
function App() {
  return (
    <div>
      <UserForm username="JohnDoe" email="john.doe@example.com" onUserSubmit={handleUserSubmit} />
      <ProductForm productName="Laptop" price={1000} onProductSubmit={handleProductSubmit} />
      <OrderForm orderId="12345" orderDate="2023-09-29" onOrderSubmit={handleOrderSubmit} />
    </div>
  );
}
```

# Dependency Inversion Principle DIP

High-level modules should not depend on low-level modules. Both should depend on abstractions.
Abstractions should not depend on details. Details should depend on abstractions

in the context of React this principle can be applied by inverting the dependency relationship between components.
such side effects , data fetching , or any external Modules this can be achived like higher order components
dependency , via props or custom hooks

```
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DataList({ fetchData, renderItem }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError);
  }, [fetchData]);

  if (error) {
    return <div>Error loading data!</div>;
  }

  return <ul>{data.map(item => renderItem(item))}</ul>;
}

DataList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
};

export default DataList;
```

- In this example his generate component that can fetch data from any Api and render it to the UI any time

```
return (
  <div>
    <h1>Users</h1>
    <DataList fetchData={fetchUsers} renderItem={renderUserItem} />

    <h1>Products</h1>
    <DataList fetchData={fetchProducts} renderItem={renderProductItem} />
  </div>
);

```
