import Client from "./client";

interface bookingProps {
  params: {
    locationId: string;
  };
}

export default async function Page({ params }: bookingProps) {
  const { locationId } = params;
  return (
    <div className="flex flex-col align-middle">
      <Client locationId={locationId} />
    </div>
  );
}
