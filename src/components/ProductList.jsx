import React from 'react'
import { Post } from './Post'

export const ProductList = ({posts}) => {
  return (
    <div>
        {posts.map(item=> (<Post key={item.id} {...item}/>))}
    </div>
  )
}
