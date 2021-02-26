const greet = (name: string) => {
	return `- Hello There!
    - ${name}`;
};

export const greetKenobi = (target: HTMLDivElement) => {
	const newElem = document.createElement("p");
	newElem.innerText = greet("General Kenobi!");
	target.appendChild(newElem);
};
