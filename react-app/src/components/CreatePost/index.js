import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import CreatePost from './CreatePostForm'



export default function CreatePostModal() {
    const [modalOpen, setModalOpen] = useState(false)


    return (
        <div>
            <button className='editButton' onClick={() => setModalOpen(true)}>Create Post</button>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <CreatePost setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
