import sadFace from '../assets/icons/sad_face.svg'

function UrlNotFoundText() {
  return (
    <div className="flex flex-col items-center backdrop-blur-xl bg-white/15 rounded-xl text-white py-4 px-10">
      <div className='flex items-center justify-center'>
        <h1 className='pr-4'>Oops!!</h1>
        <img
          className='w-[60px] h-[60px]'
          src={sadFace}
        />
      </div>

      <div className='w-full h-px bg-white my-2' />

      <p>Error Code: 404 | The URL you were looking for doesn’t exists.</p>
    </div >
  )
}

export default UrlNotFoundText;
