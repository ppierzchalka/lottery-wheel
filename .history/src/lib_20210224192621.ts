const body = document.body;
const root = document.createElement("div");
root.id = "root";

body.appendChild(root)

const greet = (name: string) => {
  return (
    `- Hello There!
    - ${names}`
  )
}

const newElem = document.createElement("p");
newElem.innerText = greet("General Kenobi!");

root?.appendChild(newElem);