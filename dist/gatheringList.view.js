// how come we don't need to wrap renderGathering in a function?
import { onSubmitAttendance } from "./gatheringList.controller.js";
export function renderGatheringList(gatherings, container) {
    container.innerHTML =
        `<ul>
            ${gatherings.map(renderGathering).join("\n")}
        </ul>`;
    container.querySelectorAll("form").forEach((form) => form.addEventListener("submit", onSubmitAttendance));
}
function renderGathering(gathering) {
    return `<li>
        <p>Title: ${gathering.title}</p>
        <p>Organizer: ${gathering.organizer}</p>
        <p>Start Time: ${gathering.startTime}</p>
        <p>Duration: ${gathering.durationInHours} Hour/s</p>
        <p>Attendants (${gathering.attendants.length}/${gathering.participantLimit})</p>
        <form data-gathering-id="${gathering.id}">
            <label for="${gathering.id}-attend-input">Name</label>
            <input
                id="${gathering.id}-attend-input"
                name="attendant"
                required />
                <button>Attend</button>
        </form>
        <ul>
            ${gathering.attendants.map((attendant) => `<li>${attendant}</li>`).join("\n")}
        </ul>
    </li>`;
}
