# File Structure

# JSX

# React Components

# Props

# { } to write JS code in JSX

# Rendering: Strings, Numbers, Booleans, Arrays (Lists), Objects

# Conditional Rendering: if/else, ternary operator, &&, ||

# Keys

# In React 16 (2019): Introduced Hooks

# React functional components more powerful than class components.

# useState

# useEffect

# useReducer

# useRef

# useMemo

# useCallback

# useContext

# prors=> way to pass data from paret to chaild

# Hooks can be use only ijn component

# Hooks can not be in Conditinal rendering

# lifting state up :: Share data from childe to parent

# useEffect cases && Dependency Array

# SideEffect

# Clean up Function

# useReducer

# useReef => allow React accessing to the dom elments with out using dom

# useContext (Context API) =>share data with multipule component without useing props

# useContext => Sharing gloubal State wiht Multipule Component without useing props

# useCallback

# useMemo

---

# Note :: React automaticly render the array

react can ont do render for object automatic
{name: "Abood", age: 20}
{null}
{undefined}

# with liste need key becuse react do render to dom so shoude know who item add or deleted

# ways to use Condition Render

//Conditional rendering
let person = { id: 4, name: "jone", role: "admin" };

1 ::

<!--

if (person.role !== "admin") {
return <h1>you are not admin</h1>;
}

 -->

2::

  <!-- 
  return person.role !== "admin" ? (
    <h1>you are not admin</h1>
  ) : (
    <>
      <h2>Hello Abood</h2>
      {users.map((user) => {
        return <User name={use.name} age={user.age} key={user.name} />;
      })}
    </>
  );
   -->

3::

<!--
      return (
    (person.role !== "admin" && <h1>you are not admin</h1>) || (
      <>
        <h2>Hello Abood</h2>
        {users.map((user) => {
          return <User name={use.name} age={user.age} key={user.name} />;
        })}
      </>
    ))
   -->

---

# if ther is no jsx

createElement("h2", {
props, Atrributes
}, "Hello Abood")

<!--
 <User name={users[0].name} age={users[0].age} />
      <User name={users[1].name} age={users[1].age} />
      <User name={users[2].name} age={users[2].age} />
       -->

---

# Function wok evry second

setInterval(() => {
setLikes(likes + 1);
}, 1000);

---

# patching State ::

لمن نعمل تغير على ال
state
مش مباشره هتتغير
بتشوف هل في سيتس اخرى في الكمبوننت رح تتغير
عشان يغيرهم مره وحده
بعدين تعمل تحديث لل
ui
وهي من ال
perfomance optimization React

---

       <button
          onClick={() => {
            setLikes(likes + 1);
            console.log("likes :: ", likes);
          }}
        >
          click likes
        </button>
        likes=> its previuse state should use  the_call_back function
        when you want use state it slfe use  callback function

---

# Note::

التعديل على ال
ui
وظيفة ال
React

---

# Hooks can not be in Conditinal rendering

if (true) {
const [test, settest] = useState(0);
}

---

# useEffecut

==> we use it for side effecut

the sideEffecut ::
any thing that effecut something out side the scope of componenet

اي شي بياثر على اشي خارج الكمبوننت

Examp ::

1.Fitching data =>its async operator بتاخد وقت
ف تعتبر
side effect=>
like=>
fetch data , asyc ,setTimeout, setInterval=>useEffecut

2.manually updateing the dom (vanila js )=> document.innerHtml, document.getElemntbyid()...etc

لمن استخدم ال
js
عشان اعدل على ال
dom
هذا يسمى
side effecut
زي لمن اغير ال
title
من دون ما استخدم ليبرري

useEffect(() => {
if (Admin) {
document.title = `${Admin} is Admin Now`;
}
console.log("useEffect is going crazy ?? ");
}, [Admin]);

[Admin]=> بنستخدم
array of debendency
عشان اقولو لمن يتغير كذا ينعملك
run
لو بس اول مره  
[]

# Three Casese OF UseEffect

useEffect is called after the component is rendered for the first Time
useEffect is called after every re-render

useEffect is called after one of its dependencies is changed

Note ::
useEffect is called after every re-render
بمعنى لمن اغير على ال
usestate
هيصير في ري ريندر
ف هيتم استدعاء ال
useEffect
كمان مره

---

# clean up Function

لمن اعمل ريتيرن ل فنكشن بداخل ال
useEffect
هي تعتبر  
clean up function
لان نعمل  
unmount للعنصر من ال dom

clean up fun ::
useEffect(() => {
return () => {
console.log("user component is unmounted");
};
});

Exp::
function DeletUSer(id) {
let newUsers = users.filter((user) => {
return user.id !== id;
});
setuser(newUsers);
}

---

# life cycle to component

انو الكمبوننت انعمله ما يسمى
mount
اي انضاف لل
dom
طب في حال انحذف نعمله
unmont

---

# useReducer

رح نقلل ال
state to one value
حاول لمن تستخدمها ال
states
يكونو قراب من بعض منطقيين

هنا جمعتهم
const stateInitial = { Admin:null,likes:0,users:usersDefult};

هدول هحذفهم
const [Admin, setAdmin] = useState(null);
const [likes, setLikes] = useState(0);
const [users, setuser] = useState(usersDefult);

هنا استخدمتها بس بتاخد فنكشن واوبجيكت فيه ال ستيت تعوتي

const [state,dispatch]=useReducer(reducer,stateInitial);

stateInitial =>فيها كل الديفلت فاليو
reducer => فيها كل ال سيت فنكشن

كمان مره حطينا الستيتس في اوبجيكت اوف ستيتس

const stateInitial = { Admin: null, likes: 0, users: usersDefult };

والريدبوسر هي فنكشن فيها اكثر من براميتر
الاكشن هو اوبجيكت فيه 2 ميثودز
ال تاب و ال بي لود البي لود
هي البيانات ال رح تمررها الو

function reducer(state, action) {
switch (action.type) {
case "setAdmin":
return { ...state, Admin: action.payload.admin };
case "setLikes":
console.log("YOU HAVE likes number :: ", state.likes + 1);

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

---

# useContext

فرضا بدي اشارك داتا للكمبوننت من دون ما استخدم ال
props

مشاركة جلوبل ستيت لاكثر من كمبوننت

<!-- function DeletButton({ deletUser, id }) {
return (
<button
onClick={() => {
deletUser(id);
}} >
DeletUser
</button>
);
} -->

      <DeletButton deletUser={deletUser} id={id} />

      كيف ممكن اعمل هيك من دون ال
      props

لمن يكون عندي
subchildren
ومحتاج لبروبس ليه اقعد امررها من ال
parecnt => to child=> to subchilde
استخدم ال
usecontent
ورح بالك

const GlobaleState = createContext();

export function Provider({ children }) {
// بنحط بداخله البيانات ال بدنا نمررها
const [state, dispatch] = useReducer(reducer, stateInitial);
function DeletUSer(id) {
dispatch({ type: "deletUser", payload: { userID: id } });
}
let value = { state, dispatch, DeletUSer };
return (
<GlobaleState.Provider value={value}>{children}</GlobaleState.Provider>
);
}

Provider => function all component can accsses to thier
children =>its sphecal props that can access to any value of this { state, dispatch, DeletUSer }

Provider
لا تنسى تعمل الها
export
وفي ملف الثاني حسب استخدامك
import

---

# why we using useCallback & useMemo

useReducer
هي
state
بس انا بقدر ادمج فيها اكثر من  
 state
لمن اغير على ال
state
بيصير ري رندر

اذا هيعمل ري ديكلير للفنكشن والاوبجيكت هذا
function DeletUSer(id) {
dispatch({ type: "deletUser", payload: { userID: id } });
}
let value = { state, dispatch, DeletUSer };
ومش احسن اشي
للاوبتيميز ف
هستخدم ال
usecallback
اني انا بدي احفظ
الفنكشن في الميموري وما بدي يضل ينعمللها ري ديكلير

بدي اعمل
optimiz react performance
لانو ال
function و object ,Array
تقال في التحميل  
 فما بدي كل مره ينعمل الهمم ري ديكلير

# usecallback=> function => Return memorise virsion function

بتتغير في حال اعطيتها اشي في الدبيندنسي اري

ف هنا مش هيعمل ري ديكلير غير مره وحده وهي لمن ينعمل ريندر لل كمبوننت
const DeletUSer = useCallback( (id)=>{
dispatch({ type: "deletUser", payload: { userID: id } });
},[]);

نفس الشئ ال

useMemo()

let value = useMemo(()=>{
return { state, dispatch, DeletUSer }
},[ state, dispatch, DeletUSer ]);

مش هيعمل ري جنيريت الا في حال تغير واحد من هدول
[ state, dispatch, DeletUSer ]

مش هيتغير اشي ف الاستخدام بس ف ال
declarition
