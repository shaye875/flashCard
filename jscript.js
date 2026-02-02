

const board = document.getElementById("board")


const all = document.getElementById("all")

function search(collection) {

    const input = document.createElement("input")
    input.name = "input"
    const lable = document.createElement("label")
    const text = document.createTextNode("search: ")
    lable.appendChild(text)
    lable.setAttribute("for", "input")

    input.addEventListener("input", () => {
        const value = input.value
        let time = collection.length
        for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < time; j++) {
                if (collection[j].textContent[i].toLowerCase() !== value[i].toLowerCase()) {
                    collection[j].remove()
                }
            }
        }
    })
    all.appendChild(lable)
    all.appendChild(input)
}

function button(collection) {
    const text = document.createTextNode("color canch")
    const button = document.createElement("button")
    button.appendChild(text)
    let count = 0
    let backgcolor
    let color
    button.addEventListener("click", () => {

        if (count % 2 === 0) {
            backgcolor = "white"
            color = "black"
        } else {
            backgcolor = "black"
            color = "white"
        }
        for (let div of collection) {
            div.style.background = backgcolor
            div.style.color = color
        }
        count++
        localStorage.setItem("color",color)
        localStorage.setItem("backgcolor",backgcolor)
    })
    if(localStorage.getItem("color") !== null){
        for (let div of collection) {
            div.style.background = localStorage.getItem("backgcolor")
            div.style.color = localStorage.getItem("color","black")
        }
    }
    board.appendChild(button)
}

async function createTerms() {
    function fetchJSONData() {
        fetch('./data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                data.forEach((card) => {
                    const h1 = document.createElement("h1")
                    const title = document.createTextNode(card.term)
                    h1.appendChild(title)
                    const p = document.createElement("p")
                    const text = document.createTextNode(card.definition)
                    p.appendChild(text)
                    const div = document.createElement("div")
                    div.appendChild(h1)
                    div.appendChild(p)
                    div.classList.add("card")
                    board.appendChild(div)
                })
                const arr = []
                const collection = document.getElementsByClassName("card")
                for (let div of collection) {
                    arr.push(div)
                }
                search(arr)
                button(collection)
            }


            )
            .catch(error => console.error('Failed to fetch data:', error));
    }
    fetchJSONData();
}







createTerms()



