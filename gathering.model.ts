// TODO: add participant profile

export type Attendee = {
  name: string;
  id: string;
};

export type Attendees = Attendee[];

export type Gathering = {
  id: string;
  location: string;
  startTime: Date;
  durationInHours: number;
  participantLimit: number;
  title: string;
  description?: string;
  organizer: string;
  attendants: Attendees;
};

export type Gatherings = Gathering[];

let gatherings: Gatherings = [];
// let attendees: Attendees = [];
const callbacks: Function[] = [];

const retrieveGatherings = localStorage.getItem("gatherings");
if (!retrieveGatherings) {
  gatherings = [] as Gatherings;
} else {
  gatherings = JSON.parse(retrieveGatherings);
}

export function createGathering(
  gathering: Omit<Gathering, "attendants" | "id">
) {
  // there is a potential bug in here! what is it? - '...gathering' does not verify that the information is matching the requirements of Gathering type.
  gatherings.push({
    ...gathering,
    id: crypto.randomUUID(),
    attendants: [],
  });

  //   localStorage.setItem("gatherings", JSON.stringify(gatherings));
  emitUpdate();

  return gatherings.at(-1)!.id;
}

export function getGatherings() {
  return gatherings.slice();
}

export function attend(gatheringId: string, attendant: string) {
  const gathering = gatherings.find(
    (gathering) => gathering.id === gatheringId
  );

  if (!gathering) {
    throw new Error(`No gathering with gathering ID ${gatheringId}`);
  }

  // validate participants limit
  if (gathering.attendants.length >= gathering.participantLimit) {
    throw new Error(
      `Gathering ${gatheringId} has reached the participant limit`
    );
  }

  // push to attedants
  gathering.attendants.push({ name: attendant, id: crypto.randomUUID() });
  console.log(gatherings);

  emitUpdate();
}

export function remove (gatheringId: string, attendeeId: string) {
    const gathering = gatherings.find((gathering) => gathering.id === gatheringId);

    if (!gathering) {
        throw new Error(`No gathering with gathering ID ${gatheringId}`);
    }

    const attendeeIndex = gathering.attendants.findIndex(attendee => attendee.id === attendeeId);
    gathering.attendants.splice(attendeeIndex, 1);

    console.log(gatherings);

    emitUpdate();
}


export function onUpdate(callback: Function) {
  callbacks.push(callback);
}

function emitUpdate() {
  callbacks.forEach((callback) => {
    if (typeof callback === "function") {
      callback();
    } else {
      console.error("Invalid callback:", callback);
    }
  });
}
