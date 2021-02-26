const body = document.body;
const root = document.getElementById("root");

body.appendChild(root)

const greet = (name: string) => {
  return (
    `- Hello There!
    - ${name}`
  )
}

const newElem = document.createElement("p");
newElem.innerText = greet("General Kenobi!");

target?.appendChild(newElem);