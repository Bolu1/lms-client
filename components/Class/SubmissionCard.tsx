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

export default function SubmissionCard(props: any) {
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
              <div>
          <a
            download="File"
            href={
              process.env.NEXT_PUBLIC_IMAGE_URL +
              props?.item.attachment_url
            }
            title={"Submission"}
            target="blank"
          >
            <div
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
                <p>{props.item.firstname}</p>
                <p>{props.item.lastname}</p>
              </div>

              <p className="text-sm text-gray-600">
                Posted {format(props.item.created_at)}
              </p>
            </div>
            </div>
          </a>
        </div>
    </>
  );
}
