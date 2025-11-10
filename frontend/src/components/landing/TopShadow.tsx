function TopShadow() {
  return (
    <div className="absolute -top-[200px] -left-[300px] -right-[300px] flex justify-between -z-10">
      <div className="w-[670px] h-[340px] bg-primary1-1 rounded-[50%] blur-2xl rotate-45 flex justify-center items-center">
        <div className="w-[338px] h-[119px] bg-primary3-1/50 rounded-[50%] blur-2xl" />
      </div>
      <div className="w-[670px] h-[340px] bg-primary1-1 rounded-[50%] blur-2xl rotate-135 flex justify-center items-center">
        <div className="w-[338px] h-[119px] bg-primary3-1/50 rounded-[50%] blur-2xl" />
      </div>
    </div>
  )
}

export default TopShadow;
