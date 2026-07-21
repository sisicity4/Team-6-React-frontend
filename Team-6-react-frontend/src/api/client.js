import axios from "axios";

const envBaseURL = import.meta.env.VITE_API_BASE_URL
const normalizeBaseURL = (value) =>
  value.endsWith("/") ? value : `${value}/`
const runtimeHost =
  typeof window !== "undefined" ? window.location.hostname : "127.0.0.1"
const devFallback = `http://${runtimeHost}:8000/api/`
const baseURL = normalizeBaseURL(
  envBaseURL || (import.meta.env.PROD ? "/api/" : devFallback),
)

const client = axios.create({
  baseURL,
})

const clearAuth = () => {
  if (typeof window === "undefined") return
  window.localStorage.removeItem("petfit_access")
  window.localStorage.removeItem("petfit_refresh")
  window.dispatchEvent(new Event("auth:logout"))
}

let refreshPromise = null

client.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config
  const token = window.localStorage.getItem("petfit_access")
  if (token && config?.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error
    if (!response || response.status !== 401) {
      return Promise.reject(error)
    }

    const requestUrl = config?.url ?? ""
    if (requestUrl.includes("login/") || requestUrl.includes("token/refresh/")) {
      clearAuth()
      return Promise.reject(error)
    }

    if (config?._retry) {
      clearAuth()
      return Promise.reject(error)
    }

    if (typeof window === "undefined") {
      return Promise.reject(error)
    }

    const refreshToken = window.localStorage.getItem("petfit_refresh")
    if (!refreshToken) {
      clearAuth()
      return Promise.reject(error)
    }

    config._retry = true
    try {
      if (!refreshPromise) {
        refreshPromise = client
          .post("token/refresh/", { refresh: refreshToken })
          .then((res) => {
            window.localStorage.setItem("petfit_access", res.data.access)
            return res.data.access
          })
          .finally(() => {
            refreshPromise = null
          })
      }

      const newToken = await refreshPromise
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${newToken}`
      return client(config)
    } catch (refreshError) {
      clearAuth()
      return Promise.reject(refreshError)
    }
  },
)

export const getProfile = async () => {
  const response = await client.get("profile/")
  return response.data
}

export const updateProfile = async (payload) => {
  const response = await client.post("profile/", payload)
  return response.data
}

export const getReflections = async () => {
  const response = await client.get("reflections/")
  return response.data
}

export const createReflection = async (payload) => {
  const response = await client.post("reflections/", payload)
  return response.data
}

export default client;
