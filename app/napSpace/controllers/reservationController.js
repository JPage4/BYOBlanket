// angular
//     .module("BYOBlanket")
//     .controller("reservationController",
//         function($scope) {
//         $scope.calendarOptions = {
//     };
//     $scope.events = [
//         {
//             title: "My Event",
//             start: new Date(),
//             description: "This is a cool event",
//             color:"#5f6dd0"
//         },
//         {
//             title: "My Event",
//             start: new moment().add(1,"days"),
//             description: "This is a cool event",
//             color:"#af6dd0"
//         }
//     ]
// $scope.buttz = () => {
//     console.log("buttz")
//     let napTime = { title: "Nap",
//     start: new Date(),
//     description: "it's naptime",
//     color:"#5f6dd0"}
//     $scope.events.push(napTime)
// }

    //   let calendar = document.getElementById("calendar").fullCalendar({
    //     // schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
    //     header: {
    //       left: "prev,next today",
    //       center: "title",
    //       right: "agendaWeek,agendaDay"
    //     },
    //     defaultView: "agendaWeek",
    //     defaultTimedEventDuration: "01:00",
    //     allDaySlot: false,
    //     scrollTime: "08:00",
    //     businessHours: {
    //       start: "9:00",
    //       end: "18:00",
    //     },
    //     events: [{
    //       title: "Jesse's Nap Time",
    //       start: "2017-12-14T15:00+17:00"
    //     }, {
    //       title: "Jared's Nap Time",
    //       start: "2017-12-15T16:00+17:30"
    //     }],
    //     editable: true,
    //     selectable: true,
    //     selectHelper: true,
    //     select: function(start, end) {
    //       let duration = (end - start) /1000;
    //       if(duration === 1800) {
    //         // set default duration to 1 hr.
    //           end = start.add(30, "mins");
    //         return calendar.fullCalendar("select", start, end);
    //       }
    //       let title = prompt("Event Title:");
    //       let eventData;
    //       if (title && title.trim()) {
    //         eventData = {
    //           title: title,
    //           start: start,
    //           end: end
    //         };
    //         calendar.fullCalendar("renderEvent", eventData);
    //       }
    //       calendar.fullCalendar("unselect");
    //     },
    //     eventRender: function(event, element) {
    //       let start = moment(event.start).fromNow();
    //       element.attr("title", start);
    //     },
    //     loading: function() {

    //     }
    //   });
});