import { ralewayBold } from "@/lib/fonts";

export default function ContentCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white shadow-md border border-gray-300 overflow-hidden sm:rounded-lg p-5 mb-5 max-w-7xl ${
        className ? className : ""
      }`}
    >
      {title && (
        <div className="px-4 sm:px-6 border-b border-gray-200 pb-5">
          <h3 className={`text-lg text-gray-900 ${ralewayBold.className}`}>
            {title}
          </h3>
        </div>
      )}
      <div className={title && "pt-5 overflow-hidden"}>{children}</div>
    </div>
  );
}
