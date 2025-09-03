import Logo from "../Logo"
import Drawer from "./Drawer"

export default function MobileNav() {
  return (
    <>
    <div className="md:hidden fixed border-[#DAD7DE55] border-b-[1px] top-0 left-0 right-0 z-50 bg-[#F3F7FF]">
        <div className="container mx-auto py-5 px-4 flex justify-between items-center-safe ">
            <Logo/>
            <Drawer/>
        </div>
    </div>
    </>
  )
}
