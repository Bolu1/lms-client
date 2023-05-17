import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Loader from "../Utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskAction } from "../../redux/taskSlice";
import { BiImages } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function DeleteTask(props: any) {
  let [isOpen, setIsOpen] = useState(false);
  let [loading, setLoading] = useState(false);


  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteTaskHandler = async () => {
    setLoading(true);
    await dispatch(
      // @ts-ignore
      deleteTaskAction(
        props.id,
        user.token,
        toast,
        router
      )
    );
    closeModal();
    setLoading(false);
  };

  return (
    <>
      <div className="">
        <svg
          onClick={openModal}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-red-600 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 px-12 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-2xl my-8 text-gray-900"
                  >
                    Are you sure you want to delete this task and all its submissions?                  </Dialog.Title>

                  <div className="mt-12">
                    <p className="">{props.message}</p>
                  </div>

                  <div className="flex mt-6 justify-end items-center space-x-4">
                    <div
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <p>cancel</p>
                    </div>

                    <div className="items-center flex ">
                      {!loading ? (
                        <button
                          onClick={() => {
                            deleteTaskHandler()
                          }}
                          className="w-full px-4 py-4 tracking-wide text-white font-medium transition-colors duration-200 transform bg-red-600 rounded-xl cursor-pointer "
                        >
                          Yes
                        </button>
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
