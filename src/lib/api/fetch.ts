type FetchWrapper = (
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) => Promise<Response>

const fetchWrapper: FetchWrapper = async (input, init) => {
  const host = (() => {
    if (typeof input === "string") {
      return new URL(input).host
    } else if (input instanceof URL) {
      return input.host
    } else {
      return new URL(input.url).host
    }
  })()

  return await fetch(input, {
    ...init,
    credentials:
      host.endsWith("kokosuki-be-prod.tsukuba-cojt-kokosuki.workers.dev") ||
      host.endsWith("kokosuki-be-dev.tsukuba-cojt-kokosuki.workers.dev") ||
      host.endsWith("localhost:8787")
        ? "include"
        : "same-origin",
  })
}

export { fetchWrapper as fetch }
