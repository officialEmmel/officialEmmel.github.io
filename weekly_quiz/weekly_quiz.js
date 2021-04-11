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
    question_index += 1;
    nextQuestion()
})

if(quiz.questions[question_index].choices.length > 2)
{

}

function nextQuestion()
{
    let choice_index = 0;
    question.innerHTML = quiz.questions[question_index].question
    choice_elements.forEach(element => {
        element.innerHTML = quiz.questions[question_index].choices[choice_index]
        choice_index += 1
    });
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
            if(quiz.questions[question_index].choices[choice_index] == quiz.questions[question_index].choices[quiz.questions[question_index].solution])
            {
                right = true;
    
            }
            choosen = quiz.questions[question_index].choices[choice_index]
            choosen_radio = element
        }
        choice_index += 1
    });
    check(right, choosen, choosen_radio)
}

function check(correct, choosen, radio)
{
    submit_button.innerHTML = "Weiter"
    submit_button.value = "next"
    if(correct)
    {
        choice_elements.forEach(element => {
            if(element.id == radio.id.split("_")[1].toUpperCase())
            {
                element.style.backgroundColor = green;
            }
        });
    }
    else
    {
        choice_elements.forEach(element => {
            if(element.id == radio.id.split("_")[1].toUpperCase())
            {
                element.style.backgroundColor = red;
            }
        });
        
    }
    choice_elements.forEach(element => {
        element.className = "disabled"
    });
}

function solutionPage()
{
    quizpage.style.display = "none"
    solutionpage.style.display = "block";
    solution_description.innerHTML = quiz.questions[question_index].description
}

nextQuestion()