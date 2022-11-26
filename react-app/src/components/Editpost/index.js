// import React, { useState, useEffect } from "react";
// import { Modal } from '../../context/Modal'
// import EditPost from './EditpostForm'

// function EditPostModal ({post,id}){
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button onClick={() => setShowModal(true)}>Edit</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <EditPost id={id} post={post} setShowModal={setShowModal}/>
//         </Modal>
//       )}
//     </>
//   );
// }

// export default EditPostModal

import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import Editpost from './EditpostForm'
// import './EditTrackForm.css'


export default function EditPostModal() {
    const [modalOpen, setModalOpen] = useState(false)


    return (
        <div>
            <button className='editButton' onClick={() => setModalOpen(true)}>Edit</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <Editpost setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
