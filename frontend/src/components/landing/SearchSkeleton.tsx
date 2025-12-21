function SearchSkeleton() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="w-full max-w-[1065px] h-[40px] mx-auto rounded-[10px] bg-primary2-2/30 animate-pulse" />

      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="w-full max-w-[1065px] h-[90px] mx-auto mt-4 rounded-[10px] px-4 bg-primary2-2/30 animate-pulse"
        />
      ))}
    </div>
  )
}

export default SearchSkeleton;
