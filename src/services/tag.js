import { TAGS } from '@/services/api'
import { request, METHOD } from '@/utils/request'

export async function getAllTags() {
  return request(TAGS, METHOD.GET, {})
}

export async function updateTag(tag) {
  return request(TAGS + '/' + tag.id, METHOD.PUT, tag)
}

export async function deleteTag(id) {
  return request(TAGS + '/' + id, METHOD.DELETE, {})
}

export async function createTag(tag) {
  return request(TAGS, METHOD.POST, tag)
}