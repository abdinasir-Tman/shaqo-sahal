"use client";
// @ts-ignore
import Modal from "react-modal";
import { useState } from "react";
import ApplicationForm from "./ApplicationForm";
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

  return (
    <div>
      <button
        className="bg-main-600 text-white px-3 py-2 rounded-md hover:bg-main-700"
        onClick={openModal}
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
