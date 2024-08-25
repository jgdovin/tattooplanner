import { formatTime } from "@/lib/utils";

export default function ShopInfo({ location }: { location: any }) {
  return (
    <div className="flex flex-col items-center w-full bg-gray-200 text-gray-700 mt-5 p-10 rounded-md gap-10">
      <h1 className="text-xl font-bold">{location.name}</h1>
      <div className="flex gap-20">
        <div>
          <p>
            {location.name} -{" "}
            <span className="text-xs text-gray-600">{location.nickname}</span>
            {location.address1 && (
              <>
                <br />
                {location.address1}
              </>
            )}
            <br />
            {location.city}, {location.state} {location.zip}
            {location.phone && (
              <>
                <br />
                <a className="hover:underline" href={`tel:${location.phone}`}>
                  {location.phone}
                </a>
              </>
            )}
            {location.email && (
              <>
                <br />
                <a
                  className="hover:underline"
                  href={`mailto:${location.email}`}
                >
                  {location.email}
                </a>
              </>
            )}
          </p>
        </div>
        <div>
          <div className="flex">
            <div className="w-24">Monday</div>
            {location.monClosed ? (
              "Closed"
            ) : (
              <>
                {formatTime(location.monStart)}- {formatTime(location.monEnd)}
              </>
            )}
          </div>
          <div className="flex">
            <div className="w-24">Tuesday</div>
            {location.tueClosed ? (
              "Closed"
            ) : (
              <>
                {formatTime(location.tueStart)}- {formatTime(location.tueEnd)}
              </>
            )}
          </div>
          <div className="flex">
            <div className="w-24">Wednesday</div>
            {location.wedClosed ? (
              "Closed"
            ) : (
              <>
                {formatTime(location.wedStart)}- {formatTime(location.wedEnd)}
              </>
            )}
          </div>
          <div className="flex">
            <div className="w-24">Thursday</div>
            {location.thuClosed ? (
              "Closed"
            ) : (
              <>
                {formatTime(location.thuStart)}- {formatTime(location.thuEnd)}
              </>
            )}
          </div>
          <div className="flex">
            <div className="w-24">Friday</div>
            {location.friClosed ? (
              "Closed"
            ) : (
              <>
                {formatTime(location.friStart)}- {formatTime(location.friEnd)}
              </>
            )}
          </div>
          <div className="flex">
            <div className="w-24">Saturday</div>
            {location.satClosed ? (
              "Closed"
            ) : (
              <>
                {formatTime(location.satStart)}- {formatTime(location.satEnd)}
              </>
            )}
          </div>
          <div className="flex">
            <div className="w-24">Sunday</div>
            {location.sunClosed ? (
              "Closed"
            ) : (
              <>
                {formatTime(location.sunStart)}- {formatTime(location.sunEnd)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
