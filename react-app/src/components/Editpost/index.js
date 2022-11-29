import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import Editpost from './EditpostForm'
// import './EditTrackForm.css'

export default function EditPostModal({post, id}) {
    const [modalOpen, setModalOpen] = useState(false)
    console.log(id,'this is id')


    return (
        <div>
            <button className='editButton' onClick={() => setModalOpen(true)}>Edit</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <Editpost post={post} id={id} setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
