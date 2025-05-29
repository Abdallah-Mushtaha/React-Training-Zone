# localStorage (Web API)

# Web API: Browser APIs

# We use `localStorage` to save data locally in The Browser.

# `setItem()`

# `getItem()`

# `clear()`

# React Router (BrowserRouter, Routes, Route, Outlet, Link)

# Layout Components

# onSubmit, onChange, onClick

# Better Folder Structure

=======================================

# localStorge in js (Web Api)

# localStorge way to store data localy in the browser

# setItem

# getItem

# clear()

# How setup tailwand css with React ,vite

# React Router

-- Web Api => Browser Apis
هي ال
Api
موجوده هفي
Envirment
تعت ال
browser ,clinte, frontend-developer
لل جافا سكريبت
لو رحت على ال
node js
مش هلاقي ال
local storge
موجود

ولو رحت على اي
enverment
اخرى مش هتلاقي ال
localStorge
متاح الك

---

localStorge :: البيانات متاحه الي على مستوى البراوزر فقط
ايش ما تخزن طريقة التخزين هتكون

Stringify.

localStorage.getItem("Abood")
'50'
localStorage.setItem("Family","Mushtaha")

localStorage.getItem("Family")
'Mushtaha'

بتقدر تعمل
window.localStorage.setItem("name","Omar");
لانها
web api  
 فهتكون متاحه في ال
windo object
function SaveINLocalStorge() {
// localStorage.setItem("Price", 100);
// localStorage.setItem("Price", { prop: 5050 });// [object Object]
localStorage.setItem("Price", JSON.stringify({ prop: 5050 })); // {"prop":5050}
}
function GetfromLocalStorge() {
// console.log(localStorage.getItem("Price"));// return as string
// console.log(typeof localStorage.getItem("Price"));

    console.log(JSON.parse(localStorage.getItem("Price"))); // return as object
    console.log(typeof JSON.parse(localStorage.getItem("Price")));

}
return (
<ReactFragment>

<h1>React Lecture 46</h1>

      <button onClick={SaveINLocalStorge} style={{ margin: "1rem" }}>
        Save Somthing in Local Storage
      </button>

      <button onClick={GetfromLocalStorge}>
        get Somthing from Local Storage
      </button>
    </ReactFragment>

);

localStorage.clear(); clean local Storge

---

كل ملف هتستخدم فيه تيلوند هتضيفه في ال
content

/** @type {import('tailwindcss').Config} \*/
export default {
content: ["./src/**/_.jsx"],
theme: {
extend: {},
},
plugins: [],
};
content: ["./src/_.jsx"] كل لملفات ال جوا الفولدر
content: ["./src/**/*.jsx"] كل لملفات ال جوا السب فولدر

---

# فرضا بدي اعمل اكثر من صفحة

# html في رياكت

# ايش العمل

هل رح اعمل اكثر من
html
بزبط بس هيكون
setup
معقد الامر
وكمان هيصير ريكوست للصفحات
وهيعمل ريلود للصفحه
وينتقل من ملف لملف ثاني

# ذكرنا سابقا انو

# React doing => update to DOM

# React Frameworke follow a type of application paternes => SPA single page Application

in =>
SPA::
التنقل بين الصفحات باستخدام  
js
بغض النظر عن الفريمورك ال شغال عليه انتا

كيف نعمل
Spa
رح نتعرف على

# React Router

الان بعد ما تنزلها
npm i react-router
هنظم الملفات تعونا
عادتا الصفحات بنحطهم في فولدر اسمو
pages او containers

وكل وحده رح اعملو
كمبوننت
وكل ملف رح تتعامل فيه على انو صفحه  
html

الان الرابط لمن يكون هيك او مع سلاش
http://localhost:5174/
ف انت هلقيت في ال
home page
طب كيف اوجهوا لصفحات ثانيه هي وظيفة الرياكت روتر
React Router
عشان نعمل
SPA

هي اول خطوه نعمل
import { BrowserRouter } from "react-router";
ونخل الها ال
childe
<BrowserRouter>
<App />
</BrowserRouter>

بعدها نعمل
Routing  
ننتقل من صفحة لصفحه

هنتعامل مع 2 كمبوننت جداد

# Routes, Route

هيكون عندي  
 Routes واحد
بداخله اكثر من
Route

 <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>

بما انهم كمبوننت يعني اي شئ رح نمررلهم اياه هو  
 props
<Route path="/" element={<App />} />

احنا بنحكي
list page
بس هي رياكت كمبوننت زيها زي اي رياكت كمبوننت
بنتعامل معم قبل هيك

/\*
لاحظ في هي الحاله ايش رح يصير
ريلود للصفحه وهيطول شوي ليش لانو مستخدمين ال
anchor link html
و انا مستخدم رياكت راوتر يعني المفروض استخدم ال
لمن انتقل من صفحه لاخرى
من راوت لراوت
لاني مش مستعمل اللينك كمبوننت تبع الرياكت راوتر
الصح استخدم

       Link
       to
    */

return (

<div>
<div className="nav bg-slate-400 p-4 text-2xl  flex gap-4 justify-between items-center">
<h1 className="text-xl font-bold  ">Student Markes</h1>

        <ul className="ul  flex gap-4 justify-between items-center">
          <li>
            <a href="/" className="hover:text-red-300">
              Home
            </a>
          </li>
          <li>
            <a href="/Insertes" className="hover:text-red-300">
              Insert
            </a>
          </li>
          <li>
            <a href="/Markes" className="hover:text-red-300">
              Marks
            </a>
          </li>
        </ul>
      </div>
    </div>

the right way ::

 <div>
      <div className="nav bg-slate-400 p-4 text-2xl  flex gap-4 justify-between items-center">
        <h1 className="text-xl font-bold  ">Student Markes</h1>

        <ul className="ul  flex gap-4 justify-between items-center">
          <li>
            <Link to="/" className="hover:text-red-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Insertes" className="hover:text-red-300">
              Insert
            </Link>
          </li>
          <li>
            <Link to="/Markes" className="hover:text-red-300">
              Marks
            </Link>
          </li>
        </ul>
      </div>
    </div>

# لاحظ ال nave

# بيروح ليه

لانو نعمل الها
aunmont
لانو الكمبوننت انحذف
وبيجي كمبوننت ثاني بداله

# واكيد مش صح اضل اضيف الفوتر وال

# nav

# في كل صحفه

الحل انو نعمل
ملف
ونحط فيه كل ال كمبوننت
ال رح اشاركها لكل الصفحات تعتي

React
المسؤوله عن تغير الصفحات
باستخدام ال
react router

شوف التعليقات ال ف ملف ال
layout

# Eventes

هي قلنا عباره عن انتراكتيف
انتراكشينز بيعملها المستخدم في صفحة الويب لمن يتفاعل
اشياء بتعامل معها المستخدم في موقعي وانا رح اتعامل مع هي الاشياء
زي
Click
scroll
supmet form
لمن يكتب

كنا سابقا في ال
js نعمل
document.getElementById("like").addEventListener("click", () => {

})
هذا قلنا
imparative code
الان رح نعمل هيك طريقه اخرى في الرياكت
Declarativce code

OnBlur=> ما انشرحت في رياكت
انو بدل ما يضل يعمل ري رندر وانا بكتب يستنى اخلص كتابه بعدها يعمل ري رندر مثلا

---

# Leacture 47

# Leacture 47

# رح نكمل قلنا مش منطق اجيب بيانات شخص شخص من اللوكل ستورج لازم الموقع يكون داينمك

const [Students, setStudents] = useState([]);
هي في ملف ال
InsertStudent

function handelfun(event) {
// console.log(event);

    event.preventDefault();
    // console.log("form is submitted");
    // Abood  50
    console.log(name, number);
    // localStorage.setItem(name, number);
    setStudents((prev) => {
      return [...prev, { name, number }];
    });

}

useEffect(() => {
localStorage.setItem("Students", JSON.stringify(Students));
}, [Students]);

الفكره انو لمن انتقل من كمبوننت لكمبوننت اخر ايش رح يصير هيصير  
 unomunt
طب لمن ارجع لكمبوننت ال
student
رح يعمل ريندر للكمبوننت
يعني الاري هترجع فاضيه وكذلك ال
useEffect
رح ينعمللها رندر باي دفلت اول مره فرح يخزن اري فاضيه عشان هيك بتروح البيانات القديمه

الحل اني اعمل

JSON.parse(localStorage.getItem("Students")) || [])
بداخل ال
useState
عشان تكون الديفلت
ليشش عملت اور
لانو ممكن ال
localStorge تكون
undifinde
وفي هي الحاله مش هقدر اعمللها
finde
في حال بديش يتكرر ال
id

# Note:: بعد شاعه من تطبيق الكود

لاحظ انو في عنا
State
مستخدمها في اكثر من مكان
في اكثر من كمبوننت وهما مش وارثين من بعض
بس انا عيز ارتب الكود بحيث ما اضلني عمل هي السيتس بكل كمبوننت قلنا هنستخدم ال
useContext
ف رح اعمل فولد احط فيه ملف فيه كل السيتيت المتكرره في الكمبوننت وارجع اشاركه باستخدام
useContext

يطلق عليه
مفهوم ال

# refactor

اني اعمل نفس الفنكشنلتي
بس ارتب واعدل الكود واختصره

---

// طب الان انا بدي هجول ال 3 ما اضل اكتبهم في كل كمبوننت اعرفهم مره
وحده وما ارجع استخدمهم فيي صفحه ثانيه رح نستخدم ال
// custem hook

const [name, setName] = useState("");
const [number, setnumber] = useState(0);
const [error, setError] = useState("");

# Custem Hooks ::

اني اجمع لوجيك مني على ال
Hooks
ومشترك بين اكثر من كمبوننت

مبني على
useState
useContext
useEffects
الى اخره

---

قلنا في حال في اكثر من ستيتس مشتركه مع اكثر من كمبوننت وما بدي اياهم  
يترسلو عبر ال
props
رح نستخدم ال
useContext

---

طب لمن يكون عندي اللوجيك مشترك بين اكثر من كمبوننت رح اروح اعمل
custem hooks

بنعمل ملف اسمو
hooks
او اي اسم بدك اياه وال
ملفات بداخله تبدا ب
use
عشان نعرف انو هذا
custem hooks

---

كمان مره عندي  
 لوجيك مبني على ال
React hooks
ومحتاج اشاركه بين اكثر من كمبوننت رح
اعملو اكستراكت واستخدمهم في ال
custem hooks
واشتغل عادي

---

### IMPORTANTE IDEA

useState => ري رندر على مستوى الكمبوننت ال هي في
Props => ري رندير على الكمبوننت ال هي رح تنبعت الو
لمن يتغيرو
هيصير
Rerendering

ال
hoockes
هي من الاشياء ال بتيجي من رياكت مش لازم نقلق منها لانو
لمن ينعمل ري رندر رياكت رح تعمل اوبتيميزينج
وهانديل بحيث ال بيرفورمنس ما يضرب

# CRUD Oprations with local Storge Done
