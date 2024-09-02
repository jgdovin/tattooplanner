import {
  createLocation,
  deleteLocation,
  getLocation,
  updateLocation,
} from "@/actions/location";
import { formSchema } from "@/forms/locationForm";
import { atom } from "jotai";
import { z } from "zod";

export const LOCATION_TYPES_TYPE = {
  PHYSICAL: "PHYSICAL",
  MOBILE: "MOBILE",
} as const;

const DEFAULT_OPEN_TIME = "09:00";
const DEFAULT_CLOSE_TIME = "17:00";
const EMPTY_STRING = "";

export type LocationType = z.infer<typeof formSchema>;

export const EMPTY_LOCATION_DATA: LocationType = {
  id: EMPTY_STRING,
  name: EMPTY_STRING,
  nickname: EMPTY_STRING,
  description: EMPTY_STRING,
  phone: EMPTY_STRING,
  email: EMPTY_STRING,
  website: EMPTY_STRING,
  x: EMPTY_STRING,
  instagram: EMPTY_STRING,
  facebook: EMPTY_STRING,
  type: LOCATION_TYPES_TYPE["PHYSICAL"], // Default value; change if necessary
  address1: EMPTY_STRING,
  address2: EMPTY_STRING,
  city: EMPTY_STRING,
  state: EMPTY_STRING,
  zip: EMPTY_STRING,
  monStart: DEFAULT_OPEN_TIME,
  monEnd: DEFAULT_CLOSE_TIME,
  monClosed: false,
  tueStart: DEFAULT_OPEN_TIME,
  tueEnd: DEFAULT_CLOSE_TIME,
  tueClosed: false,
  wedStart: DEFAULT_OPEN_TIME,
  wedEnd: DEFAULT_CLOSE_TIME,
  wedClosed: false,
  thuStart: DEFAULT_OPEN_TIME,
  thuEnd: DEFAULT_CLOSE_TIME,
  thuClosed: false,
  friStart: DEFAULT_OPEN_TIME,
  friEnd: DEFAULT_CLOSE_TIME,
  friClosed: false,
  satStart: DEFAULT_OPEN_TIME,
  satEnd: DEFAULT_CLOSE_TIME,
  satClosed: true,
  sunStart: DEFAULT_OPEN_TIME,
  sunEnd: DEFAULT_CLOSE_TIME,
  sunClosed: true,
};

// export type LocationType {
//   id?: string;
//   name: string;
//   nickname: string;
//   description: string;
//   phone: string;
//   email: string;
//   type: (typeof LOCATION_TYPES_TYPE)[keyof typeof LOCATION_TYPES_TYPE];
//   address1: string;
//   address2: string;
//   city: string;
//   state: string;
//   zip: string;
//   website: string;
//   x: string;
//   instagram: string;
//   facebook: string;
//   monStart?: string;
//   monEnd?: string;
//   monClosed: "true" | "false";
//   tueStart?: string;
//   tueEnd?: string;
//   tueClosed: "true" | "false";
//   wedStart?: string;
//   wedEnd?: string;
//   wedClosed: "true" | "false";
//   thuStart?: string;
//   thuEnd?: string;
//   thuClosed: "true" | "false";
//   friStart?: string;
//   friEnd?: string;
//   friClosed: "true" | "false";
//   satStart?: string;
//   satEnd?: string;
//   satClosed: "true" | "false";
//   sunStart?: string;
//   sunEnd?: string;
//   sunClosed: "true" | "false";
//   timezone?: string;
// }

interface LocationDictionary {
  [key: string]: LocationType;
}

export const locationAtom = atom<LocationType>(EMPTY_LOCATION_DATA);

export const locationsAtom = atom<LocationType[]>([]);

export const newLocationAtom = atom<LocationType>(EMPTY_LOCATION_DATA);

export const fetchLocationAtom = atom(
  (get) => get(locationAtom),
  async (_, set, locationId: string) => {
    if (!locationId) {
      set(locationAtom, EMPTY_LOCATION_DATA);
      return;
    }
    const res = await getLocation(locationId);
    const data = (await res) as LocationType;
    set(locationAtom, data);
  }
);

const addLocation = async (
  locations: LocationType[],
  location: LocationType
) => {
  return [...locations, location];
};

export const addLocationAtom = atom(
  null,
  async (get, set, location: LocationType) => {
    const oldLocations = get(locationsAtom);

    set(locationsAtom, await addLocation(get(locationsAtom), location));
    console.log("test");
    const res = (await createLocation(location)) as LocationType;
    console.log("test2");
    if (!res.id) {
      set(locationsAtom, oldLocations);
      return;
    }
    const newLocation = await res;

    set(locationsAtom, (locations) =>
      locations.map((l) => (l.id === "" ? newLocation : l))
    );
  }
);

export const updateLocationAtom = atom(
  null,
  async (get, set, location: LocationType) => {
    const oldLocations = get(locationsAtom);

    set(locationsAtom, (locations) =>
      locations.map((l) => (l.id === location.id ? location : l))
    );

    const res = (await updateLocation(location)) as LocationType;

    if (!res.id) {
      set(locationsAtom, oldLocations);
      // TODO: add toast notification
      return;
    }
  }
);

export const deleteLocationAtom = atom(null, async (get, set, id: string) => {
  const locations = get(locationsAtom);
  let oldLocation;
  const newLocations = locations.filter((location) => {
    if (location.id === id) {
      oldLocation = location;
      return false;
    }
    return true;
  });

  set(locationsAtom, newLocations);
  const res = await deleteLocation(id);

  if (!res?.ok && oldLocation) {
    set(locationsAtom, await addLocation(get(locationsAtom), oldLocation));
    return;
  }
  // TODO: add toast notification
  return;
});
