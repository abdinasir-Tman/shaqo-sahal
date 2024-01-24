"use client";
// @ts-ignore
import Modal from "react-modal";
import { useState } from "react";
import ApplicationForm from "./ApplicationForm";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ApplicantModal = ({
  jobId,
  employerId,
}: {
  jobId: string;
  employerId: string;
}) => {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const { data: session }: any = useSession();
  const isJobSeeker = () => {
    if (session.user.type !== "jobSeeker") {
      toast.error("sign as a job seeker");
    } else {
      openModal();
    }
  };
  return (
    <div>
      <button
        className="bg-main-600 text-white px-3 py-2 rounded-md hover:bg-main-700"
        onClick={isJobSeeker}
      >
        Apply
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="absolute right-56 left-56 bottom-56 top-20"
        contentLabel="Example Modal"
      >
        <ApplicationForm jobId={jobId} />
      </Modal>
    </div>
  );
};

export default ApplicantModal;
