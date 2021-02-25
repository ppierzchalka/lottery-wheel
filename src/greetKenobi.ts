import { greet } from "./greet";

export const greetKenobi = (target: HTMLDivElement) => {
	const newElem = document.createElement("p");
	newElem.innerText = greet("General Kenobi!");
	target.appendChild(newElem);
};
