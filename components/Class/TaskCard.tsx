import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Loader from "../Utils/Loader";
import { useDispatch, useSelector } from "react-redux";
import { checkSubmissionAction, submitTaskAction } from "../../redux/taskSlice";
import { BiImages } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import { timeStampToDate } from "../../utils/constants";

export default function TaskCard(props: any) {
  let [isOpen, setIsOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [fileName, setFileName] = useState(null);
  const [status, setStatus] = useState<any>([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state: any) => state.auth);

  const closeModal = async () => {
    setIsOpen(false);
  };

  const openModal = async () => {
    if(props.teacherId == user.id){
      router.push(`/dashboard/task/${props.item.slug}`)
      return
    }
    setIsOpen(true);
    const result = await dispatch(
      // @ts-ignore
      checkSubmissionAction(props.item.slug, user.token)
    );
    // @ts-ignore
    setStatus(result);
  };

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };

  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };

  const submitTaskHandler = async (e: React.FormEvent<EventTarget>) => {

    setLoading(true);
    e.preventDefault();
    await dispatch(
      // @ts-ignore
      submitTaskAction(fileName, props.item.slug, user.token, toast)
    );

    // props.action();
    closeModal();
    setLoading(false);
  };

  const isExpired = () => {
    if (props.duedtae == null) {
      return true;
    }
    var now = new Date(),
      // minimum date the user can choose, in this case now and in the future
      minDate = now.toISOString().substring(0, 10);
    console.log(minDate, props.item.duedate);
    if (minDate > props.item.duedate) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="">
        <div>
          <div
            onClick={openModal}
            className="bg-white rounded-md border-b cursor-pointer hover:shadow-lg h-full  border-gray-300 p-4 w-full "
          >
            <div className="flex props.items-center justify-between ">
              <div className="flex space-x-2 props.items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z"
                    clipRule="evenodd"
                  />
                  <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                </svg>
                <p>{props.item.title}</p>
              </div>

              <p className="text-sm text-gray-600">
                Posted {format(props.item.created_at)}
              </p>
            </div>
          </div>
        </div>
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
                    <div className="flex justify-between items-center">
                      <div>
                        Status:
                        {status.length != 0 && (
                          <span className="text-green-500 text-sm bg-green-100 p-3 rounded-md font-semibold w-1/4 ml-2">
                            Submitted
                          </span>
                        )}
                        {status.length == 0 && (
                          <span className="text-yellow-500 text-sm bg-yellow-100 p-3 rounded-md font-semibold w-1/4 ml-2">
                            Unsubmitted
                          </span>
                        )}
                      </div>

                      <div>
                        {props.item.duedate && (
                          <p className="text-sm text-gray-600">
                            Due Date: {timeStampToDate(props.item.duedate)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Dialog.Title>

                  {status.length != 0 && (
                    <a
                      download="File"
                      href={
                        process.env.NEXT_PUBLIC_IMAGE_URL +
                        status?.attachment_url
                      }
                      title={"Submission"}
                      target="blank"
                      className="text-blue-600 underline cursor-pointer"
                    >
                      view submission
                    </a>
                  )}

                  <form onSubmit={(e) => submitTaskHandler(e)}>
                    {isExpired() && (
                      <div>
                        <label className="block mb-2 text-sm :text-gray-200 mt-6">
                          Attachment <span className="text-red-500">*</span>
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
                          required
                        />
                      </div>
                    )}

                    <div className="flex mt-6 justify-end items-center space-x-4">
                      <div
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className="flex items-center cursor-pointer"
                      >
                        <p>cancel</p>
                      </div>

                      {isExpired() && (
                        <div className="items-center flex ">
                          {!loading ? (
                            <button
                              type="submit"
                              className="w-full px-4 py-4 tracking-wide text-white font-medium transition-colors duration-200 transform bg-black rounded-xl cursor-pointer "
                            >
                              {status.length == 0 ? "Submit" : "Resubmit"}
                            </button>
                          ) : (
                            <Loader />
                          )}
                        </div>
                      )}
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
