import NodeGeocoder, { Options } from "node-geocoder";

export async function GET() {
  const options: Options = {
    provider: "google",
    apiKey: process.env.GOOGLE_API_KEY,
    formatter: null,
  };

  const geocoder = NodeGeocoder(options);

  const res = await geocoder.geocode(
    "17380 e 95th ave, commerce city, co 80022"
  );

  return Response.json(res);
}
