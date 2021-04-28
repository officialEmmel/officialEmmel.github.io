let complete_html_list = document.getElementById("all_quizlist")
let button_class_middle = document.getElementById("button_class_middle")
let newest_quizlist = document.getElementById("newest_quiz")
let complete_list = []
let items = document.querySelectorAll("#aq_title");
let quizlist = JSON.parse(data)
console.log(quizlist.emmels_quiz_all)

let host = "localhost:5500"


for (let i = 0; i < quizlist.emmels_quiz_all.length; i++) {

}
let index = 0;
quizlist.emmels_quiz_all.forEach(element => {
    let multicollaps = []
    let div1 = document.createElement("div")
    let more_button = document.createElement("button")

    if(index >= 5)
    {
        div1.className = "col-sm collapse multi-collapse"
        div1.id = "multiCollapseExample" + index.toString()
        multicollaps.push("multiCollapseExample" + index.toString())
    }
    else
    {
        div1.className = "col-sm"
    }
    
    let div2 = document.createElement("div")
    div2.className = "ml-3 mr-3"
    let div3 = document.createElement("div")
    div3.className = "mt-3 card mx-auto"
    div3.style = "max-width: 35rem;"
    let div4 = document.createElement("div")
    div4.className = "card-body"
    
    let header = document.createElement("h5")
    header.className = "card-title text-dark"
    header.id = "aq_title"
    
    let text = document.createElement("p")
    text.className = "card-text text-dark"
    text.id = "aq_description"
    
    let button = document.createElement("a")
    button.className = "btn btn-primary mt-3"
    button.id = "aq_button"
    button.innerHTML = "Spielen"
    button.href = "http://" + host + "/quiz_player/?quiz=" + element.index.toString()
    
    div3.appendChild(div4)
    div2.appendChild(div3)
    div1.appendChild(div2)
    
    header.innerHTML = element.theme
    text.innerHTML = `Emmels Quiz - Nr. ${element.index.toString()}`
    div4.appendChild(header)
    div4.appendChild(text)
    div4.appendChild(button)
    
    complete_html_list.appendChild(div1)

    index = index + 1

    if(index == quizlist.emmels_quiz_all.length)
    {
        more_button.className = "btn eq_pri_bg eq_sec_col mb-3 mt-3 mx-auto"
        more_button.type = "button"
        more_button.dataset.toggle = "collapse"
        more_button.dataset.target = ".multi-collapse"
        more_button.setAttribute('aria-expanded', false);
        more_button.setAttribute('aria-controls', multicollaps.join(" "));
        more_button.innerHTML = "Mehr Anzeigen"
        more_button.id = "more_button"

        button_class_middle.appendChild(more_button)

        moreButton(more_button)
        newestQuiz()
    }
});

function newestQuiz()
{
    let div1 = document.createElement("div")
    div1.className = "card-body"
    
    let header = document.createElement("h5")
    header.className = "card-title text-dark"
    header.id = "aq_title"
    
    let text = document.createElement("p")
    text.className = "card-text text-dark"
    text.id = "aq_description"
    
    let button = document.createElement("a")
    button.className = "btn btn-primary mt-3"
    button.id = "aq_button"
    button.innerHTML = "Spielen"
    button.href = "http://" + host + "/quiz_player/?quiz=" + quizlist.emmels_quiz_newest.index.toString()
    
  
    
    header.innerHTML = quizlist.emmels_quiz_newest.theme
    text.innerHTML = `Emmels Quiz - Nr. ${quizlist.emmels_quiz_newest.index.toString()}`
    div1.appendChild(header)
    div1.appendChild(text)
    div1.appendChild(button)
    
    newest_quizlist.appendChild(div1)
}

function moreButton(mb){
    let toogle = false
    mb.addEventListener("click", () => {
    if(toogle)
    {
        mb.innerHTML = "Mehr Anzeigen"
        toogle = false
    }    
    else
    {
        mb.innerHTML = "Weniger Anzeigen"
        toogle = true
    }

})
}


