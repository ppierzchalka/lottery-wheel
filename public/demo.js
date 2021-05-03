const root = document.getElementById("root");
const wheel = lotteryWheel.createWheel(root, {
  members,
  onWheelStop: alert,
});
window["lotteryWheel"] = wheel;

const jsonValidation = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.log("Error parsing JSON");
  }
};

const isMember = (member) => {
  return "id" in member && "label" in member;
};

const membersValidation = (members) => {
  return members.length > 0 && members.every(isMember);
};

const submitMembers = () => {
  const membersInput = document.getElementById("members-input");
  const validatedJson = jsonValidation(membersInput.value);

  if (
    validatedJson &&
    Array.isArray(validatedJson) &&
    membersValidation(validatedJson)
  ) {
    wheel.setMembers(validatedJson);
    membersInput.value = "";
  } else {
    console.log("Invalid members array");
  }
};

const submitBtn = document.getElementById("submit-button");
submitBtn.addEventListener("click", submitMembers);

console.log(window.lotteryWheel);
