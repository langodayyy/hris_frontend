import { Input } from "./ui/input";

interface NavbarProps {
  title: string; // <- props untuk judul
  notificationCount?: number;
}

export default function Navbar({ title, notificationCount = 0 }: NavbarProps) {
  return (
  
    <nav className="fixed top-0 flex flex-row items-center w-screen h-auto bg-white px-6 py-[16px] justify-between shadow-[0px_2px_4px_#B0B0B0]">
        
      <div className="flex justify-start w-[230px] h-[29px]">
        <a href="#" className="text-2xl font-medium text-left">
          {title}
        </a>
      </div>
      <div className="flex flex-row items-center w-[400px] h-[36px] gap-[12px] relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9.58317 17.5C13.9554 17.5 17.4998 13.9555 17.4998 9.58329C17.4998 5.21104 13.9554 1.66663 9.58317 1.66663C5.21092 1.66663 1.6665 5.21104 1.6665 9.58329C1.6665 13.9555 5.21092 17.5 9.58317 17.5Z"
            stroke="#595959"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.3332 18.3333L16.6665 16.6666"
            stroke="#595959"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Input
          type="text"
          id="search"
          placeholder="Search"
          className="w-[400px] h-[36px] pl-10 rounded-[8px] bg-[#F5F6F7]"
        />
      </div>
      <div className="flex flex-row gap-[24px] w-auto h-auto">
        <div className="relative flex items-center">
          <div className="relative">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
              >
                <path
                  d="M11.5189 2.823C7.99228 2.823 5.13645 5.67883 5.13645 9.2055V11.218C5.13645 11.8697 4.86811 12.8472 4.5327 13.403L3.31561 15.4347C2.56811 16.6901 3.08561 18.0892 4.46561 18.5492C9.04645 20.073 14.001 20.073 18.5819 18.5492C19.8756 18.118 20.4314 16.6038 19.7319 15.4347L18.5148 13.403C18.1794 12.8472 17.911 11.8601 17.911 11.218V9.2055C17.9014 5.698 15.0264 2.823 11.5189 2.823Z"
                  stroke="#444750"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M14.6916 18.942C14.6916 20.6958 13.2541 22.1333 11.5003 22.1333C10.6282 22.1333 9.82325 21.7691 9.24825 21.1941C8.67325 20.6191 8.30908 19.8141 8.30908 18.942"
                  stroke="#444750"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                />
              </svg>
            </a>
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-[16px] h-[16px] bg-red-600 text-white text-xs rounded-full">
                {notificationCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-3 w-auto h-auto">
          <div className="bg-gray-400 h-10 w-10 rounded-full"></div>
          <div className="flex flex-col gap-[2px] h-auto w-auto">
            <span className="text-base font-medium text-neutral-950">
              Natashia Bunny
            </span>
            <span className="text-sm text-neutral-500">Roles User</span>
          </div>
          <div className="flex items-center">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837"
                  stroke="#444750"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// import { Command, CommandInput, CommandList, CommandItem } from '@shadcn/ui';
// // import { Input } from "./ui/input";

// export default function Navbar() {
//   return (
//     <div className="flex flex-row items-center w-full h-auto bg-white px-6 py-[16px] justify-between shadow-[0px_2px_4px_#B0B0B0]">
//       <div className="flex justify-start w-[200px] h-[29px]">
//         <a href="#" className="text-2xl font-medium text-left">Dashboard</a>
//       </div>
//       <div className="flex flex-row items-center w-[400px] h-[36px] gap-[12px] relative">
//         <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//           <path d="M9.58317 17.5C13.9554 17.5 17.4998 13.9555 17.4998 9.58329C17.4998 5.21104 13.9554 1.66663 9.58317 1.66663C5.21092 1.66663 1.6665 5.21104 1.6665 9.58329C1.6665 13.9555 5.21092 17.5 9.58317 17.5Z" stroke="#595959" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
//           <path d="M18.3332 18.3333L16.6665 16.6666" stroke="#595959" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
//         </svg>

//         {/* Ganti Input dengan Command */}
//         <Command>
//           <CommandInput placeholder="Search" className="w-[400px] h-[36px] pl-10" />
//           <CommandList>
//             <CommandItem onSelect={() => console.log('Command item selected')}>
//               Item 1
//             </CommandItem>
//             <CommandItem onSelect={() => console.log('Command item selected')}>
//               Item 2
//             </CommandItem>
//           </CommandList>
//         </Command>
//       </div>
//       <div className="flex flex-row gap-[24px] w-auto h-auto">
//         <div className="relative flex items-center">
//           <div className="relative">
//             <a href="#">
//               <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
//                 <path d="M11.5189 2.823C7.99228 2.823 5.13645 5.67883 5.13645 9.2055V11.218C5.13645 11.8697 4.86811 12.8472 4.5327 13.403L3.31561 15.4347C2.56811 16.6901 3.08561 18.0892 4.46561 18.5492C9.04645 20.073 14.001 20.073 18.5819 18.5492C19.8756 18.118 20.4314 16.6038 19.7319 15.4347L18.5148 13.403C18.1794 12.8472 17.911 11.8601 17.911 11.218V9.2055C17.9014 5.698 15.0264 2.823 11.5189 2.823Z" stroke="#444750" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round"/>
//                 <path d="M14.6916 18.942C14.6916 20.6958 13.2541 22.1333 11.5003 22.1333C10.6282 22.1333 9.82325 21.7691 9.24825 21.1941C8.67325 20.6191 8.30908 19.8141 8.30908 18.942" stroke="#444750" strokeWidth="1.25" strokeMiterlimit="10"/>
//               </svg>
//             </a>
//             <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-[16px] h-[16px] bg-red-600 text-white text-xs rounded-full">9</span>
//           </div>
//         </div>
//         <div className="flex flex-row gap-3 w-auto h-auto">
//           <div className="bg-gray-400 h-10 w-10 rounded-full"></div>
//           <div className="flex flex-col gap-[2px] h-auto w-auto">
//             <span className="text-base font-medium text-neutral-950">Natashia Bunny</span>
//             <span className="text-sm text-neutral-500">Roles User</span>
//           </div>
//           <div className="flex items-center">
//             <a href="#">
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                 <path d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837" stroke="#444750" stroke-width="1.25" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
//               </svg>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
