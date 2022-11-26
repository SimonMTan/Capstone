import React, { useState, useEffect } from "react";
import { Modal } from '../../context/Modal'
import EditPost from './EditpostForm'

export default function EditPostModal({post,id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPost id={id} post={post} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}
