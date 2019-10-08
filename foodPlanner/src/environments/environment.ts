// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:"http://localhost:8000/",
  daysOfTheWeek: ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  abbrDaysOfTheWeek:["Sun.","Mon.", "Tue.", "Wed.", "Thur.", "Fri.", "Sat."],
  google_client_id:"1082570532123-me6irfvs9fn0h55vgu9ntg8dia9u8ems.apps.googleusercontent.com",
  facebook_app_id:"558580421627920"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
