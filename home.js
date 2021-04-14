let complete_html_list = document.getElementById("all_quizlist")
let complete_list = []
let items = document.querySelectorAll("#aq_title");
let quizlist = JSON.parse(data);

console.log(quizlist.emmels_quiz_all)


for (let i = 0; i < quizlist.emmels_quiz_all.length; i++) {

}

quizlist.emmels_quiz_all.forEach(element => {
    let index = 0;
    let add = `
    <div class="col-sm">
        <div class="ml-3 mr-3">
            <div class="mt-3 card mx-auto" style="max-width: 35rem;">
                <div class="card-body">
                    <h5 class="card-title text-dark" id="aq_title">${quizlist.emmels_quiz_all[index].theme}</h5>
                    <p class="card-text text-dark" id="aq_description">Emmels Quiz - Nr. ${quizlist.emmels_quiz_all[index].index}</p>
                    <a href="#" class="btn btn-primary" id="aq_button" >Spielen</a>
                </div>
            </div>
        </div>
    </div>
    `
    let div1 = document.createElement("div")
    div1.className = "col-sm"
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
    button.className = "btn btn-primary"
    button.id = "aq_button"
    button.innerHTML = "Spielen"
    
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
});

