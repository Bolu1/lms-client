import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Loader from "../Utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { editTaskAction } from "../../redux/taskSlice";
import { BiImages } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function EditTask(props: any) {
  let [isOpen, setIsOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(props.data.title);
  const [instruction, setInstruction] = useState(props.data.instruction);
  const [dueDate, setDueDate] = useState(null);
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

  const editClassHandler = async (e: React.FormEvent<EventTarget>) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(
      // @ts-ignore
      editTaskAction(
        title,
        instruction,
        dueDate,
        props.data.slug,
        user.token,
        toast
      )
    );

    props.action();
    closeModal();
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
          className=" px-5 py-2 tracking-wide flex space-x-3 text-white font-medium transition-colors duration-200 transform bg-black rounded-lg cursor-pointer "
        >
          <p>Edit</p>
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
                    Edit Task
                  </Dialog.Title>

                  <form onSubmit={(e) => editClassHandler(e)}>
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
                          // @ts-ignore
                          setDueDate(e.target.value);
                        }}
                        className="border-b py-2 px-3 white outline-none bg-transparent w-full"
                      />
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
                            type="submit"
                            className="w-full px-4 py-4 tracking-wide text-white font-medium transition-colors duration-200 transform bg-black rounded-xl cursor-pointer "
                          >
                            Edit
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
