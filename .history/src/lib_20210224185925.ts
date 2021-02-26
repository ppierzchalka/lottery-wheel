const target = document.getElementById("root");

const greet = (name: string) => {
  return (
    `- Hello There!
    - ${name}`
  )
}

target?.innerHTML = greet("General Kenobi!");