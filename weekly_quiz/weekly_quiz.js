let quizpage = document.getElementById("quiz");
let solutionpage = document.getElementById("solution");
let question = document.getElementById("question");
let choice_elements = [document.getElementById("A"), document.getElementById("B"), document.getElementById("C")]
let choice_buttons = [document.getElementById("radio_a"), document.getElementById("radio_b"), document.getElementById("radio_c")]
let submit_button = document.getElementById("submit");
let solution_header = document.getElementById("solution_header");
let solution_text = document.getElementById("solution_text");
let solution_description = document.getElementById("solution_description");
let next_button = document.getElementById("next")
let question_index = 0;
let cookies = document.cookie;
solutionpage.style.display = "none";

let red = "#bd2020"
let green = "#20bd4a"

let quiz =  {
    title: "Allgemeinwissen",
    date: "KW 12",
    index: 26,
    questions: [
        {   
            question: "Wer war der erste Bundeskanzler von Deutschland?",
            choices: ["Konrad Adenauer", "Willy Brandt", "Helmut Schmidt"],
            solution: 0,
            description: "Konrad Hermann Joseph Adenauer war von 1949 bis 1963 der erste Bundeskanzler der Bundesrepublik Deutschland."
        },
        {    
            question: "Deutschland?",
            choices: ["Konrad Adenauer", "Willy Brandt", "Helmut Schmidt"],
            solution: 0,
            description: "Konrad Hermann Joseph Adenauer war von 1949 bis 1963 der erste Bundeskanzler der Bundesrepublik Deutschland."
        },
        {    
            question: "LOLOLOLOLOLO?",
            choices: ["Konrad Adenauer", "Willy Brandt", "Helmut Schmidt"],
            solution: 2,
            description: "Konrad Hermann Joseph Adenauer war von 1949 bis 1963 der erste Bundeskanzler der Bundesrepublik Deutschland."
        }
    ]
}

submit_button.addEventListener("click", () => {
    if(submit_button.value == "submit")
    {
        submit()
    }
    else
    {
        solutionPage()
    }

})

next_button.addEventListener("click", () => {

    location.reload()
})

if(quiz.questions[question_index].choices.length > 2)
{

}

function nextQuestion()
{
    if(getCookie(quiz.index.toString() +  "_question_index") == "")
    {
        question_index = 0
    }
    else
    {
        if(getCookie(quiz.index.toString() + "-"  + getCookie(quiz.index.toString() +  "_question_index").toString() + "_comlpleted") == "")
        {
            question_index = parseInt(getCookie(quiz.index.toString() +  "_question_index"), 10)
        }
        else
        {
            question_index = parseInt(getCookie(quiz.index.toString() +  "_question_index"), 10) + 1
        }
    }
    setCookie(quiz.index.toString() +  "_question_index", parseInt(question_index, 10), 7)
    if(quiz.questions[question_index] == undefined)
    {
        endScreen()
        return;
    }

    let choice_index = 0;
    question.innerHTML = quiz.questions[question_index].question
    choice_elements.forEach(element => {
        element.innerHTML = quiz.questions[question_index].choices[choice_index]
        choice_index += 1
    });

    (function( $ ){
        $("#quiz").hide()
        $("#quiz").fadeIn(1000)
    })( jQuery );
}

function submit()
{
    let right = false
    let choosen = ""
    let choosen_radio = ""
    let choice_index = 0;
    choice_buttons.forEach(element => {
        if(element.checked)
        {
            console.log(element.id + ": " + quiz.questions[question_index].choices[choice_index])
            choosen = quiz.questions[question_index].choices[choice_index]
            choosen_radio = element
            if(quiz.questions[question_index].choices[choice_index] == quiz.questions[question_index].choices[quiz.questions[question_index].solution])
            {
                right = true;
                setCookie(quiz.index.toString() + "-"  + question_index.toString() + "_comlpleted", btoa("true-" + choosen), 365)
            }
            else
            {
                setCookie(quiz.index.toString() + "-"  + question_index.toString() + "_comlpleted", btoa("false-" + choosen), 365)
                
            }
        }
        choice_index += 1
    });
    check(right, choosen, choosen_radio)
}

function check(correct, choosen, radio)
{
    submit_button.innerHTML = "<h5>Weiter</h5>"
    submit_button.value = "next"

    if(correct)
    {
        choice_elements.forEach(element => {
            if(element.id == radio.id.split("_")[1].toUpperCase())
            {
                element.style.backgroundColor = green;
                burst()
            }
        });
    }
    else
    {
        choice_elements.forEach(element => {
            if(element.id == radio.id.split("_")[1].toUpperCase())
            {
                element.style.backgroundColor = red;
                wrongAnim()
            }
        });
        
    }
    choice_elements.forEach(element => {
        element.className = "disabled"
    });
}

function endScreen()
{
    window.location.href = `http://${window.location.hostname}/endscreen/?quiz=` + quiz.index.toString()
}

function solutionPage()
{
    quizpage.style.display = "none"
    solutionFadeIn()
    solution_description.innerHTML = quiz.questions[question_index].description
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function solutionFadeIn(){
    (function( $ ){
        $("#solution").hide()
        $("#solution").fadeIn(1000)
    })( jQuery );
}

function wrongAnim() {
    (function( $ ){
        $("#quiz").effect("shake")
    })( jQuery );
}



nextQuestion()