

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
    
        
        for (let div of collection) {
            console.log(div);
            
            // let text = input.value           
            for (let i = 0; i < text.length; i++) {

                
                // console.log(div,div.textContent[i] ,text[i]);
                
                if (div.textContent[i] !== text[i]) {
                   div.remove()
                   collection.splice(collection.indexOf(div),1)
                }
            }
        }
    })
    all.appendChild(lable)
    all.appendChild(input)
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
            }


            )
            .catch(error => console.error('Failed to fetch data:', error));
    }
    fetchJSONData();
}







createTerms()



