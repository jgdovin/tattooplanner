"use client";;
import { use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { oswald, oswaldBold, serifBold } from "@/lib/fonts";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import {
  faCircle,
  faCircleDot,
  faDotCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface bookingProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BookingPage(props: bookingProps) {
  const params = use(props.params);

  const {
    slug
  } = params;

  return (
    <div className="flex flex-col gap-12 pt-12 justify-center items-center">
      <div className="w-full md:w-3/4 lg:w-4/5 2xl:w-1/2 flex flex-col gap-5 justify-center items-center">
        <h1
          className={`text-5xl font-bold text-gray-600 ${oswaldBold.className}`}
        >
          Store Name
        </h1>
        <Card className="w-full mx-auto p-10 drop-shadow-lg border-slate-300 bg-gray-200">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2">
            <section>
              <ul className="flex flex-col gap-5 items-center lg:items-start">
                <li>Opens Monday @ 9:00am</li>
                <li>
                  <a href="mailto:shop@email.com" className="hover:underline">
                    shop@email.com
                  </a>
                </li>
                <li>1234 E West Dr Orlando, FL 33333</li>
              </ul>
            </section>
            <section className="grid grid-cols-2 gap-10">
              <ul className={`${serifBold.className} text-right`}>
                <li>Monday</li>
                <li>Tuesday</li>
                <li>Wednesday</li>
                <li>Thursday</li>
                <li>Friday</li>
                <li>Saturday</li>
                <li>Sunday</li>
              </ul>
              <ul>
                <li className="whitespace-nowrap">9:00am - 5:00pm</li>
                <li className="whitespace-nowrap">9:00am - 5:00pm</li>
                <li className="whitespace-nowrap">9:00am - 5:00pm</li>
                <li className="whitespace-nowrap">9:00am - 5:00pm</li>
                <li className="whitespace-nowrap">9:00am - 5:00pm</li>
                <li className="whitespace-nowrap">Closed</li>
                <li className="whitespace-nowrap">Closed</li>
              </ul>
            </section>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <Card className="w-full p-6 drop-shadow-lg border-slate-300 bg-gray-100 hover:cursor-pointer">
            <CardContent className="flex flex-col gap-5">
              <h2
                className={`text-2xl font-bold text-gray-600 ${oswaldBold.className}`}
              >
                2 Hour Tattoo
              </h2>
              <p className="text-gray-600">A tattoo for two hours</p>
              <p
                className={`${oswaldBold.className} text-accent text-center justify-center w-full hover:underline`}
              >
                Book Now
              </p>
              <p className="text-gray-400">
                $200 - Deposit{" "}
                <FontAwesomeIcon icon={faCircle} className="w-2 h-2 inline" /> 2
                hours
              </p>
            </CardContent>
          </Card>
          <Card className="w-full p-6 drop-shadow-lg border-slate-300 bg-gray-100 hover:cursor-pointer">
            <CardContent className="flex flex-col gap-5">
              <h2
                className={`text-2xl font-bold text-gray-600 ${oswaldBold.className}`}
              >
                2 Hour Tattoo
              </h2>
              <p className="text-gray-600">A tattoo for two hours</p>
              <p
                className={`${oswaldBold.className} text-accent text-center justify-center w-full hover:underline`}
              >
                Book Now
              </p>
              <p className="text-gray-400">
                $200 - Deposit{" "}
                <FontAwesomeIcon icon={faCircle} className="w-2 h-2 inline" /> 2
                hours
              </p>
            </CardContent>
          </Card>
          <Card className="w-full p-6 drop-shadow-lg border-slate-300 bg-gray-100 hover:cursor-pointer">
            <CardContent className="flex flex-col gap-5">
              <h2
                className={`text-2xl font-bold text-gray-600 ${oswaldBold.className}`}
              >
                2 Hour Tattoo
              </h2>
              <p className="text-gray-600">A tattoo for two hours</p>
              <p
                className={`${oswaldBold.className} text-accent text-center justify-center w-full hover:underline`}
              >
                Book Now
              </p>
              <p className="text-gray-400">
                $200 - Deposit{" "}
                <FontAwesomeIcon icon={faCircle} className="w-2 h-2 inline" /> 2
                hours
              </p>
            </CardContent>
          </Card>
        </div>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}>
          <div className="w-full">
            <Map
              className="w-full h-96"
              defaultCenter={{ lat: 22.54992, lng: 0 }}
              defaultZoom={3}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            />
          </div>
        </APIProvider>
      </div>
    </div>
  );
}
