import { STORAGE } from '../constants/index.js';
import { API, RENDER_LIST_OF_POST, RENDER_POST_CONTENT } from '../helpers/index.js'
import { store } from '../utils/browser/storageEngine.js';
import { Card } from '../components/card/index.js'

export async function GetLatestPostHook() {
  const postStoraged = await store.getItem(
    STORAGE.latestPosts
  )

  if (postStoraged.data?.length) {
    const latestPost = JSON.parse(postStoraged.data)

    return RENDER_LIST_OF_POST(
      Promise.resolve({
        status: 'ok',
        message: 'success',
        data: latestPost
      }),
      Card
    )
  }

  return RENDER_LIST_OF_POST(API('posts'), Card)
    .then(data => {
      if (data) {
        store.setItem(
          STORAGE.latestPosts,
          JSON.stringify(data)
        );
      }
    })
}

export async function SearchingPostById(id) {
  return RENDER_POST_CONTENT(API('posts', id), {
    openDialog: true
  }).then(async postData => {
    const postRenreded = await store.getItem(STORAGE.postsRendered)

    if (!postRenreded.data) {
      store.setItem(STORAGE.postsRendered, JSON.stringify([postData]))
    } else {
      const old = JSON.parse(postRenreded.data)
      const newData = [...old, postData]
      store.setItem(STORAGE.postsRendered, JSON.stringify(newData))
    }
    return postData
  })
}

export async function GetPostBy(slug) {
  const homePostStoraged = await store.getItem(STORAGE.latestPosts)
  const searchPostStoraged = await store.getItem(STORAGE.latestPostsSearched)
  let post = undefined

  if (searchPostStoraged.data && searchPostStoraged.data?.length) {
    let postSaved = JSON.parse(searchPostStoraged.data).find(post => slug.includes(post?._embedded?.self[0]?.slug))

    if (postSaved) {
      post = post?._embedded?.self[0]
    }
  }
  if (post === undefined && homePostStoraged.data && homePostStoraged.data?.length) {
    post = JSON.parse(homePostStoraged.data).find(post => slug.includes(post?.slug))
  }
  
  if (post) {
    return RENDER_POST_CONTENT(
      Promise.resolve({
        status: 'ok',
        message: 'success',
        data: post
      })
    )
  } else {
    return RENDER_POST_CONTENT(
      Promise.reject({
        status: 'fail',
        message: 'error',
        data: []
      })
    )
  }
}
