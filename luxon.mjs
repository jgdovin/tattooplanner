import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
const date = dayjs("2024-08-20 20:17");

console.log(date.utc().format());
console.log(date.utc().local().format());
// date.toISOString() the storage format of the date

// import { DateTime } from "luxon";

// const date = DateTime.fromFormat("2024-08-20 20:17", "yyyy-MM-dd HH:mm");

// console.log(date);
// console.log("\n\n");
// console.log(date.toRelative());
// console.log(date.toUTC());
