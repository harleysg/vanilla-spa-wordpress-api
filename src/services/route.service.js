import { resetPage } from '../utils/dom/index.js';
import { GetLatestPostHook, GetPostBy } from '../hooks/getPost.js';

export default function RouteService() {
  return {
  contact: (route) => resetPage({route}),
  read: (route) => resetPage({route}),
  home: (route) => {
    resetPage({route})
    GetLatestPostHook()
  },
  post: (route, hash) => {
    resetPage({route})
    GetPostBy(hash)
  }
}}