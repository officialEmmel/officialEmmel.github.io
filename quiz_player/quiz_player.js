let quizpage = document.getElementById("quiz");
let solutionpage = document.getElementById("solution");
let quiz_list_html = document.getElementById("quiz_list")
let question = document.getElementById("question");
let choice_elements = []
let choice_buttons = []
let submit_button = document.getElementById("submit");
let solution_header = document.getElementById("solution_header");
let solution_text = document.getElementById("solution_text");
let solution_description = document.getElementById("solution_description");
let next_button = document.getElementById("next")
let imagecontainer = document.getElementById("img-container")
let question_index = 0;
let cookies = document.cookie;
solutionpage.style.display = "none";
let host = "localhost:5500"

let red = "#bd2020"
let green = "#20bd4a"

let quiz =  {
    title: "Allgemeinwissen",
    date: "KW 12",
    index: 26,
    questions: [
        {   
            question: "Wer war der erste Bundeskanzler von Deutschland?",
            choices: ["Konrad Adenauer", "Willy Brandt", "Helmut Schmidt", "lololol"],
            solution: 0,
            image: "wwwwwwwwwwwwwwwwwwww",
            description: "Konrad Hermann Joseph Adenauer war von 1949 bis 1963 der erste Bundeskanzler der Bundesrepublik Deutschland."
        },
        {    
            question: "Welche Flagge ist das?",
            choices: ["Norwegen", "Schweden", "Island", "Finnland"],
            solution: 0,
            image: "../../lol.PNG",
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

function requestJSON()
{
    let b = false
    if(getQuiz() == "")
    {
        error("Es wurde kein Quiz angefordert")
        return;
    }
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.status == 404)
        {
            if(b) return;
            error("Das von dir angeforderte Quiz wurde nicht gefunden.")
            b = true
            return;
        }

        if (this.readyState == 4 && this.status == 200) {
            if(request.response == null)
            {
                error("Beim Laden des Quiz ist ein Fehler aufgeten. Bitte versuche es später erneut.")
                return;
            }

            quiz = JSON.parse(request.response);
            nextQuestion()
        }
    };
    request.open("GET", `https://raw.githubusercontent.com/officialEmmel/officialEmmel.github.io/master/quiz_libary/${getQuiz()}.json`);
    request.send();
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

function nextQuestion()
{
    submit_button.style.display = "inline-block"
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
    if(quiz.questions[question_index].image !== undefined)
    {
        let image = document.createElement("img")
        image.src = quiz.questions[question_index].image
        image.style = "max-width: 400px; width: 100%;"
        image.className = "img-fluid"

        imagecontainer.appendChild(image)
    }

    for (let index = 0; index < quiz.questions[question_index].choices.length; index++) {
        
        const element = quiz.questions[question_index].choices[index];
        let list_item = document.createElement("li")
        let radio = document.createElement("input")
        let label = document.createElement("label")
        let spacer = document.createElement("div")

        radio.type = "radio"
        radio.name = "answer"
        radio.id = "radio_" + index.toString()
        choice_buttons.push("radio_" + index.toString())

        label.id = "label_" + index.toString()
        label.setAttribute("for", "radio_" + index.toString());
        label.innerHTML = element
        choice_elements.push("label_" + index.toString())

        spacer.style.marginTop = "20px"
        
        list_item.appendChild(radio)
        list_item.appendChild(label)
        quiz_list_html.appendChild(list_item)
        quiz_list_html.appendChild(spacer)

    }

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
        if(document.getElementById(element).checked)
        {
            console.log(element + ": " + quiz.questions[question_index].choices[choice_index])
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
    if(choosen_radio == "")
    {
        return;
    }
    check(right, choosen, choosen_radio)
}

function check(correct, choosen, radio)
{

    submit_button.innerHTML = "<h5>Weiter</h5>"
    submit_button.value = "next"
    if(correct)
    {
        choice_elements.forEach(element => {
            if(element == "label_" + radio.split("_")[1])
            {
                document.getElementById(element).style.backgroundColor = green;
                burst()
            }
        });
    }
    else
    {
        choice_elements.forEach(element => {
            if(element == "label_" + radio.split("_")[1])
            {
                document.getElementById(element).style.backgroundColor = red;
                wrongAnim()
            }
        });
        
    }
    choice_elements.forEach(element => {
        document.getElementById(element).className = "disabled"
    });
}

function endScreen()
{
    window.location.href = `http://${host}/endscreen/?quiz=` + quiz.index.toString()
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

function getQuiz()
{
  let params = new URLSearchParams(document.location.search.substring(1));
  let name = params.get("quiz");
  return name;
}

function error(msg)
{
    question.remove()
    submit_button.remove()

    let alert = document.createElement("div")
    let btn = document.createElement("button")
    btn.className = "btn eq_pri_bg eq_sec_col text-center mx-auto mt-2"
    btn.innerHTML = "zurück zum Start"
    alert.className = "alert-danger text-center mx-auto mr-5 ml-5"
    alert.style = "width: 100%; max-width: 500px; border-radius: 4px; padding: 20px;"
    alert.innerHTML = msg
    document.body.appendChild(alert)
    document.body.appendChild(btn)

    btn.addEventListener("click", () => {
        window.location.href = "http://" + host
    })
}

requestJSON()