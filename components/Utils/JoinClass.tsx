import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Loader from './Loader'
import { useDispatch, useSelector } from "react-redux";
import { joinClassAction } from "../../redux/classesSlice";
import { toast } from 'react-toastify';
import {useRouter} from 'next/router'

export default function JoinClass() {
  let [isOpen, setIsOpen] = useState(false)
  let [loading, setLoading] = useState(false)
  const [classCode, setClassCode] = useState("")

  const router = useRouter()
  const dispatch = useDispatch()

  const { user } = useSelector((state:any) => state.auth);


  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const joinClassHandler = async(e: React.FormEvent<EventTarget>) =>{
    setLoading(true)
    e.preventDefault()
    // @ts-ignore
    await dispatch(joinClassAction(classCode, user.token, toast, router));
    setLoading(false)

  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <p
          onClick={openModal}
          className="block px-4 text-sm text-gray-600 cursor-pointer transition-colors duration-200 transform :text-gray-300 "
          >
          Join Class
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
                    Join Class
                  </Dialog.Title>
                  
                  <form onSubmit={(e)=>joinClassHandler(e)}>
                  <div>
                    <label className="block mb-2 text-sm :text-gray-200">
                        Ask your teacher for the class code, then enter it here.
                    </label>
                    <div className="flex">
                      <input
                        required
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value)}
                        name="classCOde"
                        id="classCOde"
                        placeholder="Class Code"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400  border border-gray-200 rounded-md :placeholder-black :bg-gray-900 :text-gray-300 :border-gray-700 focus:border-blue-400 :focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div className="mt-12">
                      <p className="text-gray-500 text-sm">
                      To sign in with a class code
                      Use an authorized account
                      Use a class code with 8 letters or numbers, and no spaces or symbols
                      If you have trouble joining the class, contact your lecturer
                      </p>
                    </div>

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
                        Join
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
