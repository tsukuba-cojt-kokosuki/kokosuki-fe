import { setupWorker } from "msw/browser"
import { getCrossfadesCrossfadeId } from "./crossfades/crossfadeId"
import { GetUsersMeCrossfades } from "./users/me/crossfades"

export const setupMsw = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_MSW_ENABLED === "true") {
    await setupWorker(...[GetUsersMeCrossfades, getCrossfadesCrossfadeId]).start({
      // mock にないリクエストは通してあげる
      onUnhandledRequest: "bypass",
    })
  }
}
