// how come we don't need to wrap renderGathering in a function?
import { onSubmitAttendance, onRemoveAttendance, onHostGathering, } from "./gatheringList.controller.js";
export function renderGatheringList(gatherings, container) {
    container.innerHTML = `<ul>
            ${gatherings.map(renderGathering).join("\n")}
        </ul>`;
    document
        .querySelector(".hostGatheringForm")
        ?.addEventListener("submit", onHostGathering);
    container
        .querySelectorAll(".submitAttendanceForm")
        .forEach((form) => form.addEventListener("submit", onSubmitAttendance));
    container
        .querySelectorAll(".btn-remove")
        .forEach((removeButton) => removeButton.addEventListener("click", onRemoveAttendance));
}
function renderGathering(gathering) {
    return `<li>
        <p>Title: ${gathering.title}</p>
        <p>Organizer: ${gathering.organizer}</p>
        <p>Start Time: ${gathering.startTime}</p>
        <p>Duration: ${gathering.durationInHours} Hour/s</p>
        <p>Attendants (${gathering.attendants.length}/${gathering.participantLimit})</p>
        <form class="submitAttendanceForm" data-gathering-id="${gathering.id}">
            <label for="${gathering.id}-attend-input">Name</label>
            <input
                id="${gathering.id}-attend-input"
                name="attendant"
                required />
                <button>Attend</button>
        </form>
        <ul>
            ${gathering.attendants
        .map((attendant) => `
            <div class="attendee">
            <li>${attendant.name}</li>
            <button class="btn-remove" data-gathering-id-button="${gathering.id}" data-attendee-id="${attendant.id}">Remove</button>
            </div>
            `)
        .join("\n")}
        </ul>
    </li>`;
}
