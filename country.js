const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.countryContent img')
const CountryHeadingName = document.querySelector('.firstside h1')
const native = document.querySelector('.native')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const capital = document.querySelector('.capital')
const languages = document.querySelector('.languages')
const subRegion = document.querySelector('.subregion')
const ToplevelDomain = document.querySelector('.domain')
const currencies = document.querySelector('.currencies')
const borderCountry = document.querySelector('.borderCountries')
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






fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    // console.log(country.name.nativeName)
    flagImage.src = country.flags.svg
    CountryHeadingName.innerText = country.name.common

    if(country.name.nativeName){
        native.innerText = (Object.values(country.name.nativeName)[0].common)
    }
    else{
        native.innerText = country.name.common
    }
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    if (country.subregion) {
        subRegion.innerText = country.subregion
    }
    if (country.capital) {
        capital.innerText = country.capital?.[0]
    }
    ToplevelDomain.innerText = country.tld
    if (country.currencies) {
        currencies.innerText = Object.values(country.currencies)[0].name
    }
    if (country.languages) {
        languages.innerText = (Object.values(country.languages))
    }

    if (country.borders) {
        country.borders.forEach((border) => {
            console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then((res) => res.json())
                .then(([bordercountry]) => {
                    // console.log(bordercountry)
                    const bordercountryTag = document.createElement('a')
                    bordercountryTag.classList.add('borderButton')
                    bordercountryTag.innerText = bordercountry.name.common
                    bordercountryTag.href = `country.html?name=${bordercountry.name.common}`
                    // console.log(bordercountryTag)
                    borderCountry.append(bordercountryTag)
                })
    })
}


})

// themeChanger.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode')
// })

