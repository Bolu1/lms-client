import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Loader from "../Utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAction } from "../../redux/taskSlice";
import { BiImages } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function CreateClass(props:any) {
  let [isOpen, setIsOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [fileName, setFileName] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  const createClassHandler = async (e: React.FormEvent<EventTarget>) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(
    // @ts-ignore
      createTaskAction(
        title,
        instruction,
        fileName,
        dueDate,
        props.data.slug,
        user.token,
        toast,
        router
      )
    );

    props.action()
    closeModal()
    setLoading(false);
  };

  const minDate = () => {
    var now = new Date(),
      // minimum date the user can choose, in this case now and in the future
      minDate = now.toISOString().substring(0, 10);
    return minDate;
  };

  return (
    <>
      <div className="">
        <button
          onClick={openModal}
          className=" px-8 py-4 tracking-wide flex space-x-3 text-white font-medium transition-colors duration-200 transform bg-black rounded-full cursor-pointer "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p>Create</p>
        </button>
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
                    Create Task
                  </Dialog.Title>

                  <form onSubmit={(e) => createClassHandler(e)}>
                    <div>
                      <label className="block mb-2 text-sm :text-gray-200">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <input
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          name="title"
                          id="title"
                          placeholder="Title"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <label className="text-sm text-black :text-gray-200">
                          Instructions
                        </label>
                      </div>

                      <textarea
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        name="instruction"
                        id="instruction"
                        placeholder="Class Information"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>

                    <div className="mt-6">
                      <div className="mb-2">
                        <label className="text-sm text-black :text-gray-200">
                          Due Date
                        </label>
                      </div>
                      <input
                        type="date"
                        min={minDate()}
                        onChange={(e) => {
                          setDueDate(e.target.value);
                        }}
                        className="border-b py-2 px-3 white outline-none bg-transparent w-full"
                      />
                    </div>

                    <label className="block mb-2 text-sm :text-gray-200 mt-6">
                      Attachment
                    </label>
                    <div
                      className="bg-black px-4 py-4 text-base font-normal cursor-pointer "
                      onClick={handleClick}
                    >
                      <div className="flex justify-center items-center w-full my-1 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                          />
                        </svg>
                      </div>
                      <span className="flex justify-center text-center text-white text-base">
                        Attach file
                      </span>
                    </div>
                    <input
                      className="hidden "
                      type="file"
                      onChange={(e) => onChangeFile(e)}
                      ref={hiddenFileInput}
                    />

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
                            type="submit"
                            className="w-full px-4 py-4 tracking-wide text-white font-medium transition-colors duration-200 transform bg-black rounded-xl cursor-pointer "
                          >
                            Create
                          </button>
                        ) : (
                          <Loader />
                        )}
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
