// const answer = document.querySelectorAll(".answers-area .answer")
// const inputs = document.querySelectorAll("input")
// console.log(answer);
// for (let i = 1; i < 5; i++) {
//     answer[1].addEventListener("click",() =>{
        
//     })
    
// }
let countspan = document.querySelector(".count span")
let builts = document.querySelector(".spans")
let quizArea = document.querySelector(".quiz-area")
let answerarea = document.querySelector(".answers-area")
let submit = document.querySelector(".submit-button")
let builets = document.querySelector(".bullets")
let results = document.querySelector(".results")
let timer = document.querySelector(".countdown")
let htmlButton = document.querySelector(".html")
let cssButton = document.querySelector(".css")
let categoryspan = document.querySelector(".categoryspan")
console.log(results);


let currentdata = 0
let rightcheck = 0
let countdowntime
let myrequest = new XMLHttpRequest()
let myrequestcss = new XMLHttpRequest()

submit.style.display = "none"
quizArea.style.display = 'none'
answerarea.style.display = 'none'
builets.style.display = "none"
htmlButton.onclick = () =>{
    categoryspan.innerHTML = "HTML"
    getquestion()
    submit.style.display = "block"
    quizArea.style.display = 'block'
    answerarea.style.display = 'block'
    builets.style.display = "block"
    myrequest.open("Get","html_quiz.json",true)
    myrequest.send()
    htmlButton.disabled = true
    cssButton.disabled = true
    htmlButton.style.pointerEvents = "none"
    cssButton.style.pointerEvents = "none"
    htmlButton.style.opacity = ".5"
    cssButton.style.opacity = ".5"
}
cssButton.onclick = () =>{
    categoryspan.innerHTML = "CSS"
    getquestion()
    submit.style.display = "block"
    quizArea.style.display = 'block'
    answerarea.style.display = 'block'
    builets.style.display = "block"
    myrequestcss.open("Get","css_quiz.json",true)
    myrequestcss.send()
    htmlButton.disabled = true
    cssButton.disabled = true
    htmlButton.style.pointerEvents = "none"
    cssButton.style.pointerEvents = "none"
    htmlButton.style.opacity = ".5"
    cssButton.style.opacity = ".5"
}
function getquestion(){
    myrequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let quisobject = JSON.parse(this.responseText)
            let quistioncount = quisobject.length
            creatnumquis(quistioncount)
            addquestiondata(quisobject[currentdata], quistioncount)

            countdown(25, quistioncount)

            submit.onclick = ()=>{
                let rightanswer = quisobject[currentdata].right_answer
                currentdata++

                checkanswer(rightanswer,quistioncount)
                quizArea.innerHTML = ''
                answerarea.innerHTML = ''
                addquestiondata(quisobject[currentdata], quistioncount)

                handlebuilets()

                clearInterval(countdowntime)
                countdown(25, quistioncount)
                showresult(quistioncount)
            }
        }
    }
    myrequestcss.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let quisobject = JSON.parse(this.responseText)
            let quistioncount = quisobject.length
            creatnumquis(quistioncount)
            addquestiondata(quisobject[currentdata], quistioncount)

            countdown(15, quistioncount)

            submit.onclick = ()=>{
                let rightanswer = quisobject[currentdata].right_answer
                currentdata++

                checkanswer(rightanswer,quistioncount)
                quizArea.innerHTML = ''
                answerarea.innerHTML = ''
                addquestiondata(quisobject[currentdata], quistioncount)

                handlebuilets()

                clearInterval(countdowntime)
                countdown(15, quistioncount)
                showresult(quistioncount)

            }
        }
    }
}




function creatnumquis(num){
    countspan.innerHTML = num

    for(let i = 0; i < num; i++){
        let creatspan = document.createElement("span")

        if(i === 0){
            creatspan.className = "on"
        }

        builts.appendChild(creatspan)
    }
}

function addquestiondata(qO, qC){
    if(currentdata < qC){
        let title = document.createElement("h2")

    let text = document.createTextNode(qO['title'])
    title.appendChild(text)

    quizArea.appendChild(title)

    for(let i = 1; i <=4; i++){
        let maindiv = document.createElement("div")

        maindiv.className = "answer"

        let radioinput = document.createElement("input")

        radioinput.name = "questions"
        radioinput.type = 'radio'
        radioinput.id = `answer_${i}`
        radioinput.dataset.answer = qO[`answer_${i}`];
        

        if(i === 1){
            radioinput.checked = true
        }
        maindiv.addEventListener("click",() =>{
            radioinput.checked = true
        })

        let label = document.createElement("label")
        label.htmlFor = `answer_${i}`

        let labeltext = document.createTextNode(qO[`answer_${i}`])
        
        label.appendChild(labeltext)
        maindiv.appendChild(radioinput)
        maindiv.appendChild(label)
        answerarea.appendChild(maindiv)

    }
    }
}


function checkanswer(r,c){
    let answers = document.getElementsByName("questions")
    let choos;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            choos = answers[i].dataset.answer
        }
        
    }
    if (r === choos) {
        rightcheck++
        
    }



    
}

function handlebuilets(){
    let builtsspan = document.querySelectorAll(".bullets .spans span")
    console.log(builtsspan);
    
    let arrayspans = Array.from(builtsspan)
    console.log(arrayspans);
    
    arrayspans.forEach((span,index) =>{
        if(currentdata === index){
            span.className = 'on'
        }
    })
}

function showresult(count){
    let res
    if(currentdata === count){
        quizArea.remove()
        answerarea.remove()
        submit.remove()
        builets.remove()
        console.log(rightcheck);
        
        if(rightcheck > (count /2) && rightcheck < count){
            res = `<span class ="good"> Good </span>, ${rightcheck} From ${count}`
        }
        else if(rightcheck === count){
                res = `<span class ="perfect"> Perfect </span>, All Answers Is Good`
        }else{
            res = `<span class ="bad"> Bad </span>, ${rightcheck} From ${count}`
        }
        console.log(res);
        
        results.innerHTML = res
        results.style.padding = "20px"
        results.style.backgroundColor = "white"
        results.style.marginTop = "10px"
    }
}

function countdown(duration,count){
    if(currentdata < count){
        let minutes, seconds
        countdowntime = setInterval(() => {
            minutes = parseInt(duration / 60)
            seconds = parseInt(duration % 60)
            minutes = minutes < 10 ? `0${minutes}` : minutes
            seconds = seconds < 10 ? `0${seconds}` : seconds
            timer.innerHTML = `${minutes}:${seconds}`
            if(--duration < 0){
                clearInterval(countdowntime)
                submit.click()
            }
        }, 1000);
    }
}