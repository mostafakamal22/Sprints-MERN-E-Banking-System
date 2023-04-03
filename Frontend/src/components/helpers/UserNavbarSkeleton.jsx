export const UserNavbarSkeleton = () => {
  const Skeleton = new Array(15).fill().map((_, i) => (
    <li
      key={i}
      className={`flex w-full justify-between items-center ${
        i === 0 ? "mb-12" : "mb-6"
      }`}
    >
      {i === 0 ? (
        <span className="w-full p-5 rounded shadow bg-blue-200 animate-pulse"></span>
      ) : (
        <span className="w-full flex items-center p-2 rounded shadow bg-blue-200 animate-pulse"></span>
      )}
    </li>
  ));

  return Skeleton;
};
