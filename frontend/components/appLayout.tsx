import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l6J3KeWghpZ
 */
import UserDetails from "@/components/user-details"

export default function AppLayout({
  title,
  left,
  right,
  children,
}: {
  title: string,
  left: string,
  right: string,
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ToastContainer />
      <div className="p-4 mx-auto my-auto">
        <div id="modal-root" className="z-50"></div>
        <div className="mb-4 flex w-80">
          {left ? <a href={left} className="flex">
            <ChevronLeftIcon className="h-7 w-7 self-center mr-2" />
          </a> : <div className="flex">
            <div className="h-7 w-7 self-center mr-2" />
          </div>}
          <div className="w-full h-96">
            <div className="mb-4">
              <div className="w-full dark:bg-gray-900 bg-gray-100 dark:border-gray-800 p-2 rounded-lg text-center border">
                {title}
              </div>
            </div>
            <div className="rounded-lg border dark:bg-gray-900 bg-gray-100 dark:text-gray-100 text-gray-900 dark:border-gray-800 border-gray-200">
              {children}
            </div>
          </div>
          {right ? <a href={right} className="flex">
            <ChevronRightIcon className="h-7 w-7 self-center ml-2" />
          </a> : <div className="flex">
            <div className="h-7 w-7 self-center ml-2" />
          </div>}
        </div>
        <UserDetails />
      </div >
    </main>
  )
}

const ChevronLeftIcon: React.FC<React.HTMLProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};


const ChevronRightIcon: React.FC<React.HTMLProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
