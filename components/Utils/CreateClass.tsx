import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Loader from './Loader'
import { useDispatch, useSelector } from "react-redux";
import { createClassAction } from "../../redux/classesSlice";
import { BiImages } from "react-icons/bi";
import { toast } from 'react-toastify';
import {useRouter} from 'next/router'

export default function CreateClass() {
  let [isOpen, setIsOpen] = useState(false)
  let [loading, setLoading] = useState(false)
  const [className, setClassName] = useState("")
  const [classInformation, setClassInformation] = useState("")
  const [fileName, setFileName] = useState(null);

  const router = useRouter()
  const dispatch = useDispatch()

  const { user } = useSelector((state:any) => state.auth);


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    // @ts-ignore
    hiddenFileInput?.current?.click();
  };


  const onChangeFile = (e: any) => {
    setFileName(e.target.files[0]);
  };


  const createClassHandler = async(e: React.FormEvent<EventTarget>) =>{
    setLoading(true)
    e.preventDefault()
    // @ts-ignore
    await dispatch(createClassAction(className, classInformation, fileName, user.token, toast, router));
    setLoading(false)

  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <p
          onClick={openModal}
          className="block px-4 text-sm text-gray-600 cursor-pointer transition-colors duration-200 transform :text-gray-300 "
          >
          Create Class
        </p>
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
                    Create Class
                  </Dialog.Title>
                  
                  <form onSubmit={(e)=>createClassHandler(e)}>
                  <div>
                    <label className="block mb-2 text-sm :text-gray-200">
                      Class Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <input
                        required
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        name="className"
                        id="className"
                        placeholder="Class Name"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-black :text-gray-200">
                        Class Information <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <input
                      required
                      value={classInformation}
                      onChange={(e) => setClassInformation(e.target.value)}
                      type="text"
                      name="classInformation"
                      id="classInformation"
                      placeholder="Class Information"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <label className="block mb-2 text-sm :text-gray-200 mt-6">
                      Banner
                    </label>
                  <div
            className="bg-black px-4 py-4 text-base font-normal cursor-pointer "
            onClick={handleClick}
          >
            <div className="flex justify-center items-center w-full my-1 ">
              <BiImages className="text-center text-white" />
            </div>
            <span className="flex justify-center text-center text-white text-base">
              Upload Images
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
                  onClick={()=>{setIsOpen(false)}}
                  className="flex items-center cursor-pointer">
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
  )
}
