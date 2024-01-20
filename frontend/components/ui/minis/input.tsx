import { Skeleton } from "@/components/ui/skeleton"

const Input: React.FC<{ title: string, loading?: boolean, props: React.HTMLProps<HTMLInputElement> }> = ({ title, loading, props }) => {
  return (
    <div className="border-b border-gray-500 p-2">
      <div className="text-sm">{title}:</div>
      {loading ? <Skeleton className="h-6 bg-gray-200 rounded-sm" />
        : <input className="w-full text-sm dark:bg-gray-800 px-2 rounded-sm" {...props} />}
    </div>
  )
}

export default Input
