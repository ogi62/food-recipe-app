const search = document.getElementById("search")
const submit = document.getElementById("submit")
const random = document.getElementById("random")
const mealsEl = document.getElementById("meals")
const resultHeading = document.getElementById("result-heading")
const single_mealEl = document.getElementById("single-meal")
const chickenBtn = document.getElementById("chicken")
const porkBtn = document.getElementById("pork")
const lambBtn = document.getElementById("lamb")
const beefBtn = document.getElementById("beef")
const dessertBtn = document.getElementById("dessert")
const breakfastBtn = document.getElementById("breakfast")
const starterBtn = document.getElementById("starter")
const sideBtn = document.getElementById("side")
const pastaBtn = document.getElementById("pasta")
const seafoodBtn = document.getElementById("seafood")
const heavyweightBtn = document.getElementById("heavyweight")


function searchFood(food) {
  single_mealEl.innerHTML = ""

  
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${food}`)
    .then(res => res.json())
    .then(data => {

                 resultHeading.innerHTML = ` <h2>Search results for '${food}':</h2>`

                if(data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`
                } else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                        </div>
                        </div>
                    `)
                    .join("")
                } 
    })
  
}



// Search meal and fetch from API 
function searchMeal(e) {
    e.preventDefault()

    //Clear single meal
    single_mealEl.innerHTML = ""

    //Get input value
    const term = search.value

    //Check for empty with trim
    if(term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                resultHeading.innerHTML = ` <h2>Search results for '${term}':</h2>`

                if(data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`
                } else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `)
                    .join("")
                }
            })
            // Clear search text 
            search.value = ""
    }else {
        alert("Please enter a search term")
    }
}

//Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0]

            addMealToDOM(meal)
        })
}


// Fetch random meal from API
function getRandomMeal() {
    // Clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
  
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
  
        addMealToDOM(meal);
      });
  }

  

// Add meal to DOM
function addMealToDOM(meal) {
  
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      //console.log(meal[`strIngredient${i}`])
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients:</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}




// Event listeners 
submit.addEventListener("submit", searchMeal)
random.addEventListener('click', getRandomMeal)
chickenBtn.addEventListener("click",()=>searchFood("Chicken"))
porkBtn.addEventListener("click",()=>searchFood("Pork"))
lambBtn.addEventListener("click",()=>searchFood("Lamb"))
beefBtn.addEventListener("click",()=>searchFood("Beef"))
dessertBtn.addEventListener("click",()=>searchFood("Dessert"))
breakfastBtn.addEventListener("click",()=>searchFood("Breakfast"))
starterBtn.addEventListener("click",()=>searchFood("Starter"))
sideBtn.addEventListener("click",()=>searchFood("Side"))
pastaBtn.addEventListener("click",()=>searchFood("Pasta"))
seafoodBtn.addEventListener("click",()=>searchFood("Seafood"))
heavyweightBtn.addEventListener("click",()=> getMealById("52896"))




mealsEl.addEventListener("click", (e) => {

    mealsEl.innerHTML=""
    //click on pic and get meal name 
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains("meal-info")
        }else{
            return false
        }
    })

    // get meal name attribute 
    if(mealInfo) {
        const mealID = mealInfo.getAttribute("data-mealid")
        getMealById(mealID)
    }
})