import { getArtistRecentBookings } from "@/actions/booking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScissorsIcon, CalendarIcon } from "lucide-react";

export default async function BookingNotifications() {
  const bookings = await getArtistRecentBookings();
  if (!bookings) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center gap-4 p-2 bg-muted rounded-md"
          >
            <ScissorsIcon className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-col">
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                <p>
                  {booking.customer.name} Booked an appointment on{" "}
                  {booking.start.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
