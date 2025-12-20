export default function BottomShadow() {
  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 
                 pointer-events-none z-10
                 w-[767px] h-[305px] 
                 bg-purple-900/30 blur-[90px]
                 rounded-t-full" // border-top radius full
    />
  )
}