const Input: React.FC<{ title: string, props: React.HTMLProps<HTMLInputElement> }> = ({ title, props }) => {
  return (
    <div className="border-b border-gray-500 p-2">
      <div className="text-sm">{title}:</div>
      <input className="w-full text-sm dark:bg-gray-800 px-2 rounded-sm" {...props} />
    </div>
  )
}

export default Input
