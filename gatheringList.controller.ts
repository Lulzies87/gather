import * as Gathering from "./gathering.model.js";

export function onSubmitAttendance(e: SubmitEvent) {
  e.preventDefault();

  const formData = new FormData(e.target as HTMLFormElement);
  const attendant = formData.get("attendant")?.toString();

  if (!attendant) {
    const formElement = e.target as HTMLFormElement;
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("errorMsg");
    errorSpan.textContent = "Unable to add attendant!";
    formElement.appendChild(errorSpan);
    errorSpan.offsetWidth;
    errorSpan.classList.add("show");

    setTimeout(() => {
      errorSpan.classList.remove("show");
      errorSpan.addEventListener(
        "transitionend",
        () => {
          formElement.removeChild(errorSpan);
        },
        { once: true }
      );
    }, 2000);
    return;
  }

  Gathering.attend(
    (e.target as HTMLFormElement).getAttribute("data-gathering-id")!,
    attendant
  );
}

export function onRemoveAttendance(e: Event) {
    const attendeeId = (e.target as HTMLButtonElement).getAttribute("data-attendee-id");
    const gatheringId = (e.target as HTMLButtonElement).getAttribute("data-gathering-id-button");
    if (!gatheringId) {
        throw new Error (`error!`);
    }
    if (!attendeeId) {
        throw new Error (`error!`);
    }
    Gathering.remove(gatheringId, attendeeId);
  }

  export function onHostGathering(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    Gathering.createGathering({
        durationInHours: parseNumber(formData.get('duration')),
        location: parseString(formData.get('location')),
        organizer: parseString(formData.get('organizer')),
        participantLimit: parseNumber(formData.get('participantLimit')),
        startTime: formData.get('startTime'),
        title: parseString(formData.get('title'))
    });

    function parseNumber(input: FormDataEntryValue | null) {
        if (input == null) {
            throw new Error('null!');
        } else {
            return Number(input);
        }
    }

    function parseString(input: FormDataEntryValue | null) {
        if (input == null) {
            throw new Error('null!');
        } else {
            return input.toString();
        }
    }

    function parseDate(input: FormDataEntryValue | null) {
        if (input == null) {
            throw new Error('null!');
        } else {
            alert('blabla');
        }
    }
  }