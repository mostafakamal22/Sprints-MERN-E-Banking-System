export const UserNavbarSkeleton = () => {
  const Skeleton = new Array(15).fill().map((_, i) => (
    <span key={i} className="w-full flex justify-center items-center mb-6">
      <span className="w-full p-4 rounded shadow bg-blue-200 animate-pulse"></span>
    </span>
  ));

  return Skeleton;
};
