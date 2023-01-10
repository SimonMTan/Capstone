import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import CreatePost from './CreatePostForm'
import './index.css'

export default function CreatePostModal({user}) {
    const [modalOpen, setModalOpen] = useState(false)


    return (
        <div>
            {/* <img src={user.profile_photo}></img> */}
            <div className='yourmindbox'onClick={() => setModalOpen(true)}>What's on your mind ... ?</div>
            {modalOpen && (<Modal onClose={()=> setModalOpen(false)}>
                <CreatePost setModalOpen={setModalOpen}/>
            </Modal>)}
        </div>
    )
}
