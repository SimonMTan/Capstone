import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {getPostsThunk} from '../store/post'


function NewsFeed () {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const posts = useSelector(state => state.post);
    const allposts = Object.values(posts)
    console.log(allposts, 'this is allposts')
    const comment = useSelector(state => state.comment);

    console.log(comment)
    useEffect(() => {
        dispatch(getPostsThunk());
    },[dispatch])


    return (
        <div>
            <div>

            </div>
            <div>
                {allposts.map((post) => (
                    <div key={post.id}>
                        <div>
                            <div>{post.user.first_name}</div>
                            <div>{post.user.last_name}</div>
                        </div>
                        <div>{post.post_msg}</div>
                        <img src={post.post_img}></img>
                        <video controls>
                            <source src={post.post_video} type="video/mp4">
                            </source>
                        </video>
                    </div>
                ))}
            </div>
        </div>
    )}

export default NewsFeed;
