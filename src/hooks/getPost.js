import { STORAGE } from '../constants/index.js';
import { API, GET_DATA, GET_POST_CONTENT } from '../helpers/index.js'
import { Card } from '../components/card/index.js'

export function GetLatestPostHook() {
  const postStoraged = sessionStorage.getItem(
    STORAGE.latestPost
  )

  if (postStoraged && postStoraged.length > 0) {
    const latestPost = JSON.parse(postStoraged)

    return GET_DATA(
      Promise.resolve({
        status: 'ok',
        message: 'success',
        data: latestPost
      }),
      Card
    )
  }

  return GET_DATA(API('posts'), Card)
    .then(data => {
      if (data) {
        sessionStorage.setItem(
          STORAGE.latestPost,
          JSON.stringify(data)
        );
      }
    })
}

export function GetPostBy(slug) {
  const postStoraged = sessionStorage.getItem(
    STORAGE.latestPost
  )

  if (postStoraged && postStoraged.length) {
    const latestPost = JSON.parse(postStoraged)

    const post = latestPost.find(post => {
      return slug.includes(post?.slug)
    })

    GET_POST_CONTENT(
      Promise.resolve({
        status: 'ok',
        message: 'success',
        data: post
      })
    )
  }
}
