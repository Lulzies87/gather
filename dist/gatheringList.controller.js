import * as Gathering from "./gathering.model.js";
export function onSubmitAttendance(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const attendant = formData.get("attendant")?.toString();
    if (!attendant) {
        const formElement = e.target;
        const errorSpan = document.createElement("span");
        errorSpan.classList.add("errorMsg");
        errorSpan.textContent = "Unable to add attendant!";
        formElement.appendChild(errorSpan);
        errorSpan.offsetWidth;
        errorSpan.classList.add("show");
        setTimeout(() => {
            errorSpan.classList.remove("show");
            errorSpan.addEventListener("transitionend", () => {
                formElement.removeChild(errorSpan);
            }, { once: true });
        }, 2000);
        return;
    }
    Gathering.attend(e.target.getAttribute("data-gathering-id"), attendant);
}
