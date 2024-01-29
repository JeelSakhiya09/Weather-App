const tempFeild = document.querySelector(".weather1");
const locaFeild = document.querySelector(".weather2 p");
const timeFeild = document.querySelector(".weather2 span");
const emojiFeild = document.querySelector(".weather3 p img");
const condFeild = document.querySelector(".weather3 span");
const searchFeild = document.querySelector(".searchFeild");
const form = document.querySelector(".myForm");

let target = "Delhi";

const fetchData = async(target) => {
    try{
        const url = `http://api.weatherapi.com/v1/current.json?key=54b2c7553d80434086955447231410&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);


    const {
        current : {
            temp_c,
            condition :{text, icon}
        },
        location : {
            name,
            localtime
        }
    } = data;
    updateDom(temp_c, localtime, text, name, icon);
    }
    catch(error){
        alert(error);
    }
}

function updateDom(temp, date, cond, city, emoji){

    const exactTime = date.split(" ");
    const exactDate = exactTime[0].split("-");
    const exactDay = new Date(exactDate).getDay();

    let currDay;

    switch (exactDay) {
        case 0:
            currDay = "Sunday";
            break;
        case 1:
            currDay = "Monday";
            break;
        case 2:
            currDay = "Tuesday";
            break;
        case 3:
            currDay = "Wednesday";
            break;
        case 4:
            currDay = "Thursday";
            break;
        case 5:
            currDay = "Friday";
            break;
        case 6:
            currDay = "Saturday";
            break;
    }

    tempFeild.innerText = `${temp}°`;
    timeFeild.innerText = `${exactTime[1]} - ${currDay} ${exactTime[0]}`;
    condFeild.innerText = cond;
    locaFeild.innerText = city;
    emojiFeild.src = emoji;
}

fetchData(target);

const search = (e) =>{
    e.preventDefault();
    target = searchFeild.value;
    console.log(target)
    fetchData(target);
}

form.addEventListener("submit", search);