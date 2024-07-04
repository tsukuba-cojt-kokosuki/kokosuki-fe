import { setupWorker } from "msw/browser"
import { GetLatestCrossfades } from "./crossfades/latest/crossfades"
import { GetPopularCrossfades } from "./crossfades/popular/crossfades"
import { GetUsersMeCrossfades } from "./users/me/crossfades"

export const setupMsw = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_MSW_ENABLED === "true") {
    await setupWorker(...[GetUsersMeCrossfades, GetLatestCrossfades, GetPopularCrossfades]).start({
      // mock にないリクエストは通してあげる
      onUnhandledRequest: "bypass",
    })
  }
}
