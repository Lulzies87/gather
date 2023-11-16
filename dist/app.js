// [V] 1. Show more details about the gathering (organizer, start time, duration, etc...)
// [V] 2. When adding an attendant fails, show appropriate message (alert)
// [V] 2++. Show message in the DOM
// [?] 3. Persist data to local storage
// [V] 4. Add option to remove an attendance
// [ ] 5. Filter gatherings by name (add a search input on top)
// [V] 6. Create "host a gathering" form
// [ ] 7. Implement users (model, link with gatherings, etc...)
import * as Gatherings from "./gathering.model.js";
import * as GatheringListView from "./gatheringList.view.js";
// const typescriptMeetupId = Gatherings.createGathering({
//     durationInHours: 1,
//     location: "Tel-Aviv",
//     organizer: "Omer",
//     participantLimit: 2,
//     startTime: new Date(),
//     title: "Typescript Meetup"
// });
// Gatherings.createGathering({
//     durationInHours: 1.5,
//     location: "Ramat-Gan",
//     organizer: "Gilad",
//     participantLimit: 15,
//     startTime: new Date(),
//     title: "Fullstack Practice"
// });
const gatheringListElement = document.getElementById("gathering-list");
renderGatheringList();
Gatherings.onUpdate(renderGatheringList);
function renderGatheringList() {
    if (gatheringListElement) {
        GatheringListView.renderGatheringList(Gatherings.getGatherings(), gatheringListElement);
    }
}
