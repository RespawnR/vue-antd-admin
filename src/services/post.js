import { GETALLPOSTS } from '@/services/api'
import { request, METHOD } from '@/utils/request'

export async function getAllPosts() {
  return request(GETALLPOSTS, METHOD.GET, {})
}