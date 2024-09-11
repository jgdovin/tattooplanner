import BookingNotifications from "@/components/custom/BookingNotifications";

export default async function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <BookingNotifications />
    </div>
  );
}
