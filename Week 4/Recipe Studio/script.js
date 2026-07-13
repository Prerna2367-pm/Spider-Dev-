const recipes = [
{
    id:1,
    title:"Pancakes",
    category:"Breakfast",
    image:"https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600",
    ingredients:[
        "2 cups Flour",
        "2 Eggs",
        "1 cup Milk",
        "2 tbsp Sugar",
        "Butter"
    ],
    instructions:"Mix all ingredients well. Pour onto a hot pan and cook both sides until golden."
},

{
    id:2,
    title:"Chicken Pasta",
    category:"Lunch",
    image:"https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    ingredients:[
        "Pasta",
        "Chicken",
        "Cream",
        "Garlic",
        "Cheese"
    ],
    instructions:"Cook pasta. Fry chicken. Mix with cream sauce and serve."
},

{
    id:3,
    title:"Burger",
    category:"Dinner",
    image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    ingredients:[
        "Burger Bun",
        "Beef Patty",
        "Cheese",
        "Tomato",
        "Lettuce"
    ],
    instructions:"Grill the beef patty. Assemble all ingredients inside the bun."
},

{
    id:4,
    title:"Chocolate Cake",
    category:"Dessert",
    image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    ingredients:[
        "Flour",
        "Eggs",
        "Cocoa Powder",
        "Milk",
        "Sugar"
    ],
    instructions:"Mix ingredients and bake at 180°C for 35 minutes."
},

{
    id:5,
    title:"Fruit Salad",
    category:"Snack",
    image:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600",
    ingredients:[
        "Apple",
        "Banana",
        "Orange",
        "Grapes",
        "Honey"
    ],
    instructions:"Chop fruits and drizzle with honey."
}
];

// Elements
const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const randomRecipe = document.getElementById("randomRecipe");

// Modal Elements
const modal = document.getElementById("recipeModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");
const closeModal = document.getElementById("closeModal");

// Display Recipes
function displayRecipes(recipeList){

    recipeContainer.innerHTML="";

    recipeList.forEach(recipe=>{

        recipeContainer.innerHTML += `

        <div class="recipe-card">

            <img src="${recipe.image}" alt="${recipe.title}">

            <div class="recipe-info">

                <h3>${recipe.title}</h3>

                <p>${recipe.category}</p>

                <button onclick="openRecipe(${recipe.id})">
                    View Recipe
                </button>

            </div>

        </div>

        `;

    });

}

// Load Recipes
displayRecipes(recipes);

// Search
searchInput.addEventListener("keyup",()=>{

    const value = searchInput.value.toLowerCase();

    const filtered = recipes.filter(recipe=>

        recipe.title.toLowerCase().includes(value)

    );

    displayRecipes(filtered);

});

// Category Filter
categoryFilter.addEventListener("change",()=>{

    if(categoryFilter.value==="all"){

        displayRecipes(recipes);

        return;

    }

    const filtered = recipes.filter(recipe=>

        recipe.category===categoryFilter.value

    );

    displayRecipes(filtered);

});

// Random Recipe
randomRecipe.addEventListener("click",()=>{

    const random = recipes[Math.floor(Math.random()*recipes.length)];

    openRecipe(random.id);

});

// Open Modal
function openRecipe(id){

    const recipe = recipes.find(r=>r.id===id);

    modalImage.src = recipe.image;

    modalTitle.textContent = recipe.title;

    modalCategory.textContent = recipe.category;

    ingredients.innerHTML="";

    recipe.ingredients.forEach(item=>{

        ingredients.innerHTML += `<li>${item}</li>`;

    });

    instructions.textContent = recipe.instructions;

    modal.style.display="flex";

}

// Close Modal
closeModal.onclick=function(){

    modal.style.display="none";

}

window.onclick=function(e){

    if(e.target===modal){

        modal.style.display="none";

    }

}
// =====================================
// FAVORITES
// =====================================

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoriteContainer = document.getElementById("favoriteContainer");
const favoriteBtn = document.getElementById("favoriteBtn");

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function displayFavorites() {

    favoriteContainer.innerHTML = "";

    if (favorites.length === 0) {
        favoriteContainer.innerHTML = "<p>No favorite recipes yet ❤️</p>";
        return;
    }

    favorites.forEach(recipe => {

        favoriteContainer.innerHTML += `

        <div class="recipe-card">

            <img src="${recipe.image}" alt="${recipe.title}">

            <div class="recipe-info">

                <h3>${recipe.title}</h3>

                <p>${recipe.category}</p>

                <button onclick="openRecipe(${recipe.id})">
                    View Recipe
                </button>

            </div>

        </div>

        `;

    });

}

displayFavorites();

favoriteBtn.addEventListener("click", () => {

    const recipe = recipes.find(r => r.title === modalTitle.textContent);

    if (!favorites.some(f => f.id === recipe.id)) {

        favorites.push(recipe);

        saveFavorites();

        displayFavorites();

        alert("❤️ Recipe added to favorites!");

    } else {

        alert("Already in favorites!");

    }

});

// =====================================
// DARK MODE
// =====================================

const themeBtn = document.getElementById("themeBtn");

// Load saved theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
    '<i class="fa-solid fa-sun"></i>';

} else {

    themeBtn.innerHTML =
    '<i class="fa-solid fa-moon"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
        '<i class="fa-solid fa-moon"></i>';

    }

});

// =====================================
// SHARE RECIPE
// =====================================

const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", () => {

    const recipeName = modalTitle.textContent;

    if (navigator.share) {

        navigator.share({

            title: recipeName,

            text: "Check out this delicious recipe!",

            url: window.location.href

        });

    } else {

        navigator.clipboard.writeText(window.location.href);

        alert("Recipe link copied!");

    }

});

// =====================================
// RECENTLY VIEWED
// =====================================

let recentRecipes =
JSON.parse(localStorage.getItem("recentRecipes")) || [];

function saveRecent(recipe){

    recentRecipes = recentRecipes.filter(r=>r.id!==recipe.id);

    recentRecipes.unshift(recipe);

    if(recentRecipes.length>5){

        recentRecipes.pop();

    }

    localStorage.setItem(

        "recentRecipes",

        JSON.stringify(recentRecipes)

    );

}

// Update openRecipe()

const oldOpenRecipe = openRecipe;

openRecipe = function(id){

    oldOpenRecipe(id);

    const recipe = recipes.find(r=>r.id===id);

    saveRecent(recipe);

};
// =====================================
// COOKING TIMER
// =====================================

let timer;
let totalSeconds = 0;

const timerDisplay = document.getElementById("time");

function updateTimer() {

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

document.getElementById("startTimer").addEventListener("click", () => {

    clearInterval(timer);

    timer = setInterval(() => {

        totalSeconds++;

        updateTimer();

    }, 1000);

});

document.getElementById("pauseTimer").addEventListener("click", () => {

    clearInterval(timer);

});

document.getElementById("resetTimer").addEventListener("click", () => {

    clearInterval(timer);

    totalSeconds = 0;

    updateTimer();

});

updateTimer();


// =====================================
// SHOPPING LIST
// =====================================

const shoppingList = document.getElementById("shoppingList");

document.getElementById("generateList").addEventListener("click", () => {

    shoppingList.innerHTML = "";

    let items = [];

    recipes.forEach(recipe => {

        items.push(...recipe.ingredients);

    });

    items = [...new Set(items)];

    items.forEach(item => {

        const li = document.createElement("li");

        li.textContent = "🛒 " + item;

        shoppingList.appendChild(li);

    });

});


// =====================================
// MEAL PLANNER
// =====================================

const days = document.querySelectorAll(".day");

days.forEach(day => {

    const savedMeal = localStorage.getItem(day.textContent);

    if(savedMeal){

        day.innerHTML =
        "<strong>" + day.textContent + "</strong><br><br>" +
        savedMeal;

    }

    day.addEventListener("click", () => {

        const meal = prompt("Enter meal for " + day.textContent);

        if(meal){

            localStorage.setItem(day.textContent, meal);

            day.innerHTML =
            "<strong>" + day.textContent + "</strong><br><br>" +
            meal;

        }

    });

});


// =====================================
// SEARCH BUTTON
// =====================================

document.getElementById("searchBtn").addEventListener("click",()=>{

    const value = searchInput.value.toLowerCase();

    const filtered = recipes.filter(recipe=>{

        return recipe.title.toLowerCase().includes(value);

    });

    displayRecipes(filtered);

});


// =====================================
// LOADING EFFECT
// =====================================

window.addEventListener("load",()=>{

    document.body.style.opacity="1";

});


// =====================================
// ESC KEY CLOSE MODAL
// =====================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modal.style.display="none";

    }

});


// =====================================
// SMOOTH SCROLL
// =====================================

document.querySelectorAll('nav a').forEach(link=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        const target=document.querySelector(link.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// =====================================
// RECIPE OF THE DAY
// =====================================

const today = new Date().getDate();

const recipeOfDay = recipes[today % recipes.length];

console.log("Recipe of the Day:", recipeOfDay.title);


// =====================================
// END OF PROJECT
// =====================================

console.log("Recipe Studio Loaded Successfully ❤️");