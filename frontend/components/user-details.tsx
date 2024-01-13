import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const UserDetails: React.FC<any> = () => {
  //https://stackoverflow.com/questions/72673362/error-text-content-does-not-match-server-rendered-html
  const [hydrated, setHydrated] = React.useState(false);
  const router = useRouter();
  const pathName = usePathname()

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (<>
    <div className="text-right">
      <Button className="inline-block dark:bg-gray-900 bg-gray-100 border dark:border-gray-800" onClick={() => navigate(pathName, router)}>
        {!hydrated ? null : getUserName()}
      </Button>
    </div >
  </>)
}

// allow double-click on the button in case you dont want to make any changes
function navigate(path: string | null, router: AppRouterInstance) {
  if (path && path === "/editUser") {
    router.back()
    return
  }

  window.location.assign("/editUser")
}

function getUserName() {
  const name = localStorage.getItem("userName")
  return name || "Anonymous"
}

export default UserDetails
