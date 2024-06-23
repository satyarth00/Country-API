const container1 = document.querySelector('.container')
const filterByRegion = document.querySelector('.select')
let allCountriesData
const searchField = document.querySelector('.div3 input')
const themeChanger = document.querySelector('.div2')

let darkMode = localStorage.getItem("dark-theme");

const enableDarkMode = () => {
    document.body.classList.add('dark-mode')
 localStorage.setItem("dark-theme", "enabled");
};

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode')
  localStorage.setItem("dark-theme", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode(); // set state of darkMode on page load
}

themeChanger.addEventListener('click', (e) => {
    darkMode = localStorage.getItem("dark-theme"); // update darkMode when clicked
    if (darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})








fetch('https://restcountries.com/v3.1/all').then((res) => res.json())
    .then((data) => {
        rendercountries(data)
        allCountriesData=data
    })
         

filterByRegion.addEventListener('change', (e) => {
    // console.log(e.target.value)
fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`).then((res) => res.json())
        .then(rendercountries)
}) 
 
function rendercountries(data) {
    container1.innerHTML=''
    data.forEach((country) => {
     console.log(country)
        const countryCard = document.createElement('a')
        countryCard.classList.add('container1')
        countryCard.href=`./country.html?name=${country.name.common}`
            
        const innerCard =`<img class="image" src="${country.flags.svg}" alt="">
                    <div class="content">
                    <h3>${country.name.common}</h3>
                        <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                        <p><b>Region:</b> ${country.region}</p>
                        <p><b>Capital:</b> ${country.capital}</p>
                    </div>`
        
        countryCard.innerHTML = innerCard
                    
        container1.append(countryCard)

    })
    
}
searchField.addEventListener('input',(e) => {
    console.log(e.target.value)
    console.log(allCountriesData)
    const filterCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filterCountries)
    rendercountries(filterCountries)
    })

// themeChanger.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode')
    
//     })



                   