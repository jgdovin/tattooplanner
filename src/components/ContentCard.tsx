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
      className={`bg-white shadow overflow-hidden sm:rounded-lg p-5 max-w-7xl ${
        className ? className : ""
      }`}
    >
      {title && (
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 pb-5">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
      )}
      <div className={title && "pt-5"}>{children}</div>
    </div>
  );
}
