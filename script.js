let timeOfDay = {
    "8 AM" : " ",
    "9 AM" : " ",
    "10 AM" : " ",
    "11 AM" : " ",
    "12 PM" : " ",
    "1 PM" : " ",
    "2 PM" : " ",
    "3 PM" : " ",
    "4 PM" : " ",
    "5 PM" : " ",
    "6 PM" : " ",
    "7 PM" : " ",
    "8 PM" : " ",
};

$(document).ready(function(){
    if(!localStorage.getItem('timeOfDay')){
        updateAgenda(timeOfDay);
    } 
    else {
        updateAgenda(JSON.parse(localStorage.getItem('timeOfDay')));
    }
})

$('#date-today h6').text(moment().format('dddd') + ", " + moment().format('mmm Do YYYY, h:m:ss a'));

let counter = 1;
for(const property in timeOfDay){
    let textEntry = "#text-entry" + counter;
    $(textEntry).text(timeOfDay[property]);
    let timeId = "#time" + counter;
    let presentHour = moment().hour();
    let timeString = $(timeId).text();
    let timeNumber = numberedHour(timeString);
    
    if(timeNumber < presentHour){
        $(textEntry).addClass("past")
    }
    else if(timeNumber > presentHour){
        $(textEntry).addClass("future")
    }
    else{
        $(textEntry).addClass("present")
    }
    counter++;
}

$("button").click(function(){
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();

    saveAgenda(hourString, value);
});

function numberedHour(hourString){
    switch(hourString){
        case "8 AM": return 8;
        case "9 AM": return 9;
        case "10 AM": return 10;
        case "11 AM": return 11;
        case "12 AM": return 12;
        case "1 AM": return 13;
        case "2 AM": return 14;
        case "3 AM": return 15;
        case "4 AM": return 16;
        case "5 AM": return 17;
        case "6 AM": return 18;
        case "7 AM": return 19;
        case "8 AM": return 20;
    }
}

function loadData () {
    result = localStorage.getItem("timeofDay");
    return(result ? result : timeOfDay);
};

function localStorageInitialization(){
    localStorage.setItem("timeOfDay", JSON.stringify(timeOfDay));
}

function saveToLocalStorage(dayObj) {
    localStorage.setItem("timeOfDay", JSON.stringify(dayObj));
}

function saveAgenda(hourString, val) {
    if(!localStorage.getItem("timeOfDay")) {
        localStorageInitialization();
    }


let workHours = JSON.parse(localStorage.getItem("timeOfDay"));
workHours[hourString] = val

saveToLocalStorage(workHours)
}

function updateAgenda(dayObj){
    $(".calendar-row").each(function(index){
        let res = $(this).children("div");
        $(this).children("textarea").text(dayObj[res.text()]);
    })
}