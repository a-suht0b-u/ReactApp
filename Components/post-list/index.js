import React from 'react';
import PostListItem from '../post-list-item';

const PostList = ({ posts, onDelete,onToggleImportant,onToggleLiked}) => {

    const elems = posts.map((item) => {
        const { id, ...itemProps}=item
        return (
            <li key={id} className="list-group-item">
                <PostListItem {...itemProps}
                    onDelete={() => onDelete(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleLiked={() => onToggleLiked(id)} />
            </li>
            )
    });

    return (
        <ul className='app-list list-group'>
            {elems}
        </ul>
    )
}

export default PostList;