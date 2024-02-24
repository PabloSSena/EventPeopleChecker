
A mini-application that allows event hosts to check people into an event.

The home page show:

- an event selector (`select`) displaying the name of each event, by default displaying `Select an event` (communities collection);
- a list of people registered in the selected event (people collection).

The list of people allow the event host to:

- see first and last name together (full name), company name, title, check-in date, and check-out date both using `MM/DD/YYYY, HH:mm` format or `N/A`;
- check people into the event by clicking the "Check-in {person firstName and lastName}" button;
- if the user was checked-in over five seconds ago, we want to see a "Check-out {person firstName and lastName}" check-out button.

Between the event selector and the list of people we can see a summary like this:

- `People in the event right now: 10`;
- `People by company in the event right now: Green Group (10), Hoppe Group (5)`;
- `People not checked-in: 200`;
