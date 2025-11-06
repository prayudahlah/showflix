type InputProps = {
  placeholder: string;
  type?: string;
}

function Input({ placeholder, type }: InputProps) {
  return (
    <>
      <input
        placeholder={placeholder}
        className="bg-primary2-2/30 w-full py-2 px-4 rounded-lg
                   shadow-[inset_2px_2px_4px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-primary2-1
                   transition-all leading-tight"
        type={type ?? ""}
      />
    </>
  )
}

export default Input
