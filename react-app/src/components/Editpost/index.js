import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import Editpost from './EditpostForm'
// import './EditTrackForm.css'

export default function EditPostModal({post, id,setShowOption}) {
    const [modalOpen, setModalOpen] = useState(false)
    // console.log(id,'this is id')


    return (
        <div>
            <div className='editButton' onClick={() => setModalOpen(true)}>Edit</div>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <Editpost post={post} id={id} setModalOpen={setModalOpen} setShowOption={setShowOption}/>
            </Modal>)}
        </div>
    )
}
