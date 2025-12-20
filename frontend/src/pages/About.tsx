import StarsBg from '../components/StarsBg.tsx'
import Identity from '../components/about/identity.tsx'

function About() {
  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden bg-[#010109]">
      <StarsBg />
      <Identity />        
    </div>
  )
}

export default About