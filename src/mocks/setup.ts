import { setupWorker } from "msw/browser"
import { GetCrossfadesCrossfadeId } from "./crossfades/crossfadeId/crossfade"
import { PostCrossfadeIdLikes } from "./crossfades/crossfadeId/likes/like"
import { GetLatestCrossfades } from "./crossfades/latest/crossfades"
import { GetPopularCrossfades } from "./crossfades/popular/crossfades"
import { GetUsersMe } from "./users/me/me"
import { GetUsersUserIdCrossfades } from "./users/userId/crossfades"

export const setupMsw = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_MSW_ENABLED === "true") {
    await setupWorker(
      ...[
        GetUsersMe,
        GetUsersUserIdCrossfades,
        GetLatestCrossfades,
        GetPopularCrossfades,
        GetCrossfadesCrossfadeId,
        PostCrossfadeIdLikes,
      ],
    ).start({
      // mock にないリクエストは通してあげる
      onUnhandledRequest: "bypass",
    })
  }
}
