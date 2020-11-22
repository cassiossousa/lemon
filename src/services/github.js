import * as config from '../config'

const headers = {
  Authorization: `Basic ${btoa(
    `${config.GITHUB_AUTH_USERNAME}:${config.GITHUB_AUTH_PERSONAL_TOKEN}`,
  )}`,
}

export const getUserDetails = async login => {
  if (!login) throw Error('login not valid')
  const endpoint = `${config.BASE_API_URL}${config.USER_ENDPOINT}/${login}`
  const response = await fetch(endpoint, {
    headers,
  })

  if (!response.ok) throw Error('github error fetching users')

  return response.json()
}

export const getUsers = async ({ since = 0 } = {}) => {
  const endpoint = `${config.BASE_API_URL}${config.USER_ENDPOINT}?since=${since}&per_page=${config.USERS_PER_REQUEST}`
  const response = await fetch(endpoint, {
    headers,
  })

  if (!response.ok) throw Error('github error fetching users')

  const users = await response.json()

  const userDetailPromises = users.map(async user => {
    const details = await getUserDetails(user.login)
    return { ...user, ...details }
  })

  // the loop above returns an array of promises, so
  // we need to wait for all of them to finish
  const userDetails = await Promise.all(userDetailPromises)
  return userDetails
}
