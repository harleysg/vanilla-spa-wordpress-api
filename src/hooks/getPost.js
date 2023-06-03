import { Card } from '../components/card/index.js'
import { API, GET_DATA } from '../helpers/index.js'

export function GetPostHook({root}) {
  return GET_DATA(API('posts'), Card)
}