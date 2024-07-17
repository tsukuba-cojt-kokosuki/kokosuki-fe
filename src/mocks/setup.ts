import { setupWorker } from "msw/browser"
import { GetUsersMe } from "./users/me/me"
import { GetLatestCrossfades } from "./crossfades/latest/crossfades"
import { GetPopularCrossfades } from "./crossfades/popular/crossfades"
import { GetUsersUserIdCrossfades } from "./users/userId/crossfades"
import { GetCrossfadeIdCrossfades } from "./crossfades/crossfadeId/crossfade"
import { PostCrossfadeIdLikes } from "./crossfades/crossfadeId/likes/like"

export const setupMsw = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_MSW_ENABLED === "true") {
    await setupWorker(...[GetUsersMe ,GetUsersUserIdCrossfades, GetLatestCrossfades, GetPopularCrossfades, GetCrossfadeIdCrossfades, PostCrossfadeIdLikes]).start({
      // mock にないリクエストは通してあげる
      onUnhandledRequest: "bypass",
    })
  }
}
