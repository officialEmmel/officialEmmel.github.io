let quizlist = JSON.parse(data);
let title = document.getElementById("title")
let table = document.getElementById("answer_table")
let body = document.getElementById("body_")
let alert_ = document.getElementById("alert")

let right = 0;
let fals = 0;


let quiz =  {}
function requestJSON()
{
    if(getQuiz() == "")
    {
        return;
    }
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.status == 404)
        {
            return;
        }

        if (this.readyState == 4 && this.status == 200) {
            if(request.response == null)
            {
                return;
            }

            quiz = JSON.parse(request.response);
            start()
        }
    };
    request.open("GET", `https://raw.githubusercontent.com/officialEmmel/officialEmmel.github.io/master/quiz_libary/${getQuiz()}.json`);
    request.send();
}

console.log(getQuiz())

function start()
{

  title.innerHTML = quizlist.emmels_quiz_all[getQuiz() - 1].theme
  for (let index = 0; index < quiz.questions.length; index++) {
    let tmp = atob(getCookie(getQuiz() + "-" + index.toString() + "_comlpleted"))
    let c = tmp.split("-") 
    let q = quiz.questions[index].question
    let a = c[1]


    let table_row = document.createElement("tr")
    let table_q = document.createElement("th")
    let table_a = document.createElement("td")

    table_q.innerHTML = q
    table_a.innerHTML = a
    table_q.className = "text-left"
    table_a.className = "wrong"

    if(c[0] == "true")
    {
      table_a.className = "right"
      right += 1
    }
    else
    {
      fals += 1
    }

    table_row.appendChild(table_q)
    table_row.appendChild(table_a)
    table.appendChild(table_row)

  }
  chart(right, fals)
}

function getQuiz()
{
  let params = new URLSearchParams(document.location.search.substring(1));
  let name = params.get("quiz");
  return name;
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

function rechart()
{
  chart(right, fals)
}

function chart(right, fals)
{
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Richtig', right],
          ['Falsch', fals],
        ]);

        var options = {
          title: '',
          colors:["#20bd4a", "#bd2020"],
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart'));

        chart.draw(data, options);
      }
}

requestJSON();