import { Dialog } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function ErrorDialog({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<any>>;
  children: ReactNode;
}) {
  return (
    <div className="px-10 py-5 relative">
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(null)}
        className={
          "bg-red-200 text-red-800 font-semibold text-sm text-center px-5 w-4/5 lg:w-1/2 py-2 absolute left-1/2 bottom-10 transform -translate-x-1/2 rounded outline outline-1 outline-red-300"
        }
      >
        <Dialog.Panel className="flex justify-between items-center">
          <div>{children}</div>
          <button onClick={() => setIsOpen(null)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
