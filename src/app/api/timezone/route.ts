import timezones from "./timezones.json";
export async function GET(request: Request) {
  const timeZoneArr: any = [];
  for (let i = 0; i < timezones.length; i++) {
    timeZoneArr.push([timezones[i].value, timezones[i].text]);
  }
  return Response.json(timeZoneArr);
}
