import { greet } from "./greet";

export default (target: HTMLDivElement) => {
	const newElem = document.createElement("p");
	newElem.innerText = greet("General Kenobi!");
	target.appendChild(newElem);
};
