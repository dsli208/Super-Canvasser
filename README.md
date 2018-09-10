# Super-Canvasser
##OVERVIEW

Super Canvasser helps organizations run door-to-door canvassing campaigns (sales campaign, fund-raising campaign, election campaign, opinion poll, etc.).  The system supports three roles: campaign managers, who manage the information associated with campaigns; canvassers, who visit the locations in campaigns on assigned dates; and system administrators, who manage user accounts.

======================================================================
##FUNCTIONALITY FOR CAMPAIGN MANAGERS

###2.1 CREATE, VIEW, AND EDIT CAMPAIGNS.  create campaigns and view and edit data associated with them.  this data includes:

managers: set of users who can edit data for this campaign.  these users must have the campaign manager role.  initially, this set contains the campaign's creator.

dates: a contiguous range of dates

talking points: text describing what the canvasser should say during visits 

questionnaire: a list of yes/no questions specific to the campaign.  Examples: Did you hear of our product before?  Do you plan to vote in the next election?

visit duration = expected average duration of a visit to a location

locations: set of addresses to visit, and results from the visit to each location.  the system can display this data as a list of addresses or as a map with a marker at each location.

canvassers: set of canvassers selected to work on this campaign.

locations are added to a campaign by entering text in a textbox.  the text contains one address per line, in the following format: NUMBER, STREET, UNIT, CITY, STATE, ZIP.  Example: 40, Piedmont Drive, Apartment 16B, Brookhaven, NY, 11776  the system should allow at least 100 addresses to be uploaded at a time.

all above information about a campaign can be edited before, but not after, the campaign starts.  other information associated with a campaign (namely, canvassing assignment and results) is discussed below.

###2.2 CREATE CANVASSING ASSIGNMENT.  a "task" is a set of locations to be visited by one canvasser on one day, with a recommended order for the visits.   for a selected campaign, the system partitions the locations into tasks and assigns one task to each canvasser on each day that the canvasser will work on the campaign.  the number of created tasks should be the minimum (or close to it) such that the duration of the longest task is less than or equal to the work-day duration (a global parameter).  the system then assigns the tasks to days and canvassers, packing the tasks towards the beginning of the campaign.  for example, if two canvassers are selected to work on a 2-day campaign with 3 tasks, and both canvassers are available on both days, then both canvassers will be assigned tasks on the first day, and only one of them will be assigned a task on the second day.  if some tasks remain unassigned (because there are not enough canvassers or days), the system displays a detailed warning message, but keeps the canvassing assignment anyway.  the campaign manager can later edit the campaign to address this issue, if desired.

a canvasser can be assigned a task on a given day only if he/she is available (i.e., planning to work) on that day and unassigned (i.e., not already assigned a task in any campaign) on that day.  for simplicity, the system does not support assigning multiple tasks per day to a canvasser.

if the dates, canvassers, or locations for a campaign are modified, the system updates or discards any previously computed canvassing assignment for it.

###2.3 VIEW CANVASSING ASSIGNMENT
The canvassing assignment for a selected campaign is displayed in a table showing the date, canvasser, number of locations, and duration of each task.  the user can select a task to see additional details, including the set of locations in that task.  the user can choose whether to see the locations as a list of addresses in the recommended order or as markers on a map.

###2.4 VIEW CAMPAIGN RESULTS
The system supports the following three views.  (1) Table of detailed results, showing all information from all locations.  (2) Statistical summary of results, including average and standard deviation of the ratings, and percentages of "yes" and "no" answers for each question in the questionnaire.  (3) Visual summary of results in the form of a map with a marker for each location in the campaign, such that the color and/or shape of the markers indicate the rating of each location or that the location lacks a rating.

======================================================================
##3. FUNCTIONALITY FOR CANVASSERS

###3.1 EDIT AVAILABILITY
i.e., dates on which the canvasser is available for work.  This can be done conveniently, e.g., by clicking on dates on a calendar.

###3.2 VIEW UPCOMING CANVASSING ASSIGNMENTS
select a canvassing assignment from the list to see details, including a map with markers at the locations assigned to this user, and a list of the addresses of those locations.

###3.3 CANVASS
the system loads the current day's canvassing assignment and displays the address of the next location to visit and a map with a marker at that location.  the system initially displays the next location to visit in the recommended order.  the canvasser is not required to follow the recommended order and can manually change the next location by selecting it from a list of unvisited locations.  the system displays detailed travel directions from the most recently visited location to the next location.

after visiting a location, the canvasser enters the results.  the results include: (1) whether the canvasser spoke to anyone, (2) a rating of how successful the visit was (e.g., how likely the person at that location is to vote for the candidate, buy the product, or contribute to the organization) on a scale of 0 to 5 stars, (3) answers to the questionnaire (some questions might be unanswered), and (4) brief notes.  if that location was visited out-of-order, the system computes a new recommended order in which to visit the remaining (unvisited) locations.

======================================================================
4. FUNCTIONALITY FOR SYSTEM ADMINISTRATORS

4.1 EDIT USERS.  add and remove users, and edit the set of roles granted to each user.  any subset of the three roles can be granted to any user.  note: you can manually insert some initial users in the user database.  subsequent users are added using the system's GUI.

4.2 EDIT GLOBAL PARAMETERS.  global parameters include the duration of a work day (this is a limit on the maximum duration of a task) and the average speed of a canvasser traveling between locations.

======================================================================
5. OTHER REQUIREMENTS

5.1 AUTHENTICATION.  All access to the system requires authentication with a password.

5.2 NETWORK SECURITY.  Communication is secured using HTTPS or SSL.  If your server does not have a public-key certificate signed by a certification authority trusted by your browser, your web browser will show a security warning.  You could work around this by creating a self-signed certificate, and installing the key in the browser, but that is optional.  Telling the browser to proceed despite the security warning is acceptable.

5.3 CONCURRENCY.  Synchronization should be used to ensure correct behavior when multiple users access the system concurrently.

5.4 MULTI-HOST OPERATION.  The client and server can run on different hosts.

5.5 USER INTERFACE.  Campaign managers and system administrators users access the system through a web interface.  For canvassers, the system provides one of the following: a web interface designed to be usable on the screen of a mobile device (e.g., tablet) or a mobile app.

======================================================================
NOTES

CANVASSING ASSIGNMENT.  you are encouraged to reduce the problem of computing a canvassing assignment to a known optimization problem and use an existing algorithm for that problem.  designing an ad-hoc algorithm yourself will probably lead to worse results.  hw3-design must describe in detail your team's proposed approach to computing the canvassing assignment.

ADDRESSES.  A possible source of real addresses to use when testing is 
https://results.openaddresses.io/

GEOCODING.  Geocoding services return the latitude and longitude of an address (needed to mark the location on a map).  here are some services to consider; let me know if you find better ones.
https://www.census.gov/geo/maps-data/data/geocoder.html  (free)
https://wiki.openstreetmap.org/wiki/Nominatim (free)
https://developers.google.com/maps/documentation/geocoding/start
  (inexpensive, e.g., $5 for 1000 requests)

MAPPING LIBRARY.  A popular mapping library to consider is https://leafletjs.com/
