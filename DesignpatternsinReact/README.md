# Design Patterns in React

# 1.Single Responsible Principle ::

Example Featching Data Masseges ::

The simple Design Patterns in React is a collection of reusable design patterns that can be used in React projects.
its mean when u quering your components in React u should always bulid your components with ideas that evrey
component will be responsible for one thing and one thing only

and then we will give any thing else to another component
Taht mean we will Render the Home page and allow to render any subComponent to the Home page

As we know any data will fetch from the api and then we will render the data
by useEffect we will fetch the data and will update the state and then we will render the data to the Home page

but home page its not actually responsible for rendering own data(in Example :: Own Posts)
its actually pass the "post"state to the Post Components

we see component

```bash
<PosteFeed postes={Postes} />
```

will resived the "post"state from the Home page and then will render the data to the Post Component
this graet becuse Home page Foucs on handel the state and the Fetching data from UseEffect
and thin deling this actually posts to the PostFeed Component

if We going for the post Fields we will see the postFeed will responsebile of
taking a list of posts and then rendering them as posts Cards to the PostFeed Component

its doesn't render each post as post Card it will map each post then pass to the PostCard Component

then if we go to PostesCard we will see its responsible for rendering the post Card
that have a post prop and will render ui for evrey single post to the PostCard Component

here there is no fetching data or manpulatig just simple component that u can use it anywhere in your app

# so when u use Compometns in React u should make sure that makes only one thing and then endelgte every thing else to another component

The Second Design Pattern in React is ::

# page Compoments , FeaturComponents , UI Components ::

why say FeatureComponents :: Because its handle a feature of the app its does something
its handele som thing likes signin or signup or any thing else

which means That all of the users will be able to signin application thats is the FeatureComponent
which means ::
all of the code thats related to signin the user in
should go to this component and be responsible for this Component

the code that will be validate the form should be responsiblity of the signin forme
beacuse its feature component in this part of this feature

u should have a function to input data its responsible for signin form validation why because its feature component

# 2.Compound Components ::

a Component that is made up of subComponents That all Design to work together is called a Compound Component
this is the great Design Pattern in React
beacuse its allow you to design Really Really col Components

```bash
 <div className="p-16">
        <Select>
          <Select.Option key="1">Option 1</Select.Option>
          <Select.Option key="2">Option 2</Select.Option>
          <Select.Option key="3">Option 3</Select.Option>
        </Select>
      </div>
```

that u locked this optional component to only evrey this used under the select Component
wich mwans u will never wory about this option Component bing used anywhere else
and having to figerit in hareth this use case

u can desgin spasepcly to work with this Component
make sure using react context will be use only with select Component

u inforce that optional Component will only be used under the select Component

# 3. Extract Component ::

That mean Extracting all hocks from the component and move them to spichal custem Hooks
thats will be more useful for the future to Mo

in this case the signin will be responsible for rendering only the ui its doesn't have any logics to act with
all the code will be moved to the custem Hooks defrent files which make is more easy to worke with

this make your component more reusable and more testable more easy to debug and more easy to mantain

# Important Note out the code ::

This code may not work now because I used it as an example, but in terms of logic and logic, I understand the design pattern in React and its forms. I will modify the code and apply it in future projects, not because of laziness on my part, but because of online university studies in palistian "Gaza" are exhausting..
