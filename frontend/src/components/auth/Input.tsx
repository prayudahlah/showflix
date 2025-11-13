type InputProps = {
  placeholder: string;
  type?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ placeholder, type, id, value, onChange }: InputProps) {
  return (
    <>
      <input
        placeholder={placeholder}
        className="bg-primary2-2/30 w-full py-2 px-4 rounded-lg
                   shadow-[inset_2px_2px_4px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-primary2-1
                   transition-all leading-tight"
        type={type ?? ""}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default Input
