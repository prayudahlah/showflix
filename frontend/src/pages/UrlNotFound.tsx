import StarsBg from '../components/StarsBg.tsx'
import UrlNotFoundText from '../components/UrlNotFoundText.tsx'

function UrlNotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-[#010109]">
      <StarsBg />
      <UrlNotFoundText />
    </div>
  )
}

export default UrlNotFound

