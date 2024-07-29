import { setupWorker } from "msw/browser"
import {
  GetCrossfadesCrossfadeId,
  PostCrossfadesCrossfadeId,
  PutCrossfadesCrossfadeId,
} from "./crossfades/crossfadeId"
import { PostCrossfadeIdLikes } from "./crossfades/crossfadeId/likes"
import { GetLatestCrossfades } from "./crossfades/latest"
import { GetPopularCrossfades } from "./crossfades/popular"
import { GetUsersMe } from "./users/me"
import { GetUsersUserId, GetUsersUserIdCrossfades } from "./users/userId"

export const setupMsw = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_MSW_ENABLED === "true") {
    await setupWorker(
      ...[
        GetUsersMe,
        GetUsersUserIdCrossfades,
        GetUsersUserId,
        GetLatestCrossfades,
        GetPopularCrossfades,
        GetCrossfadesCrossfadeId,
        PostCrossfadesCrossfadeId,
        PutCrossfadesCrossfadeId,
        PostCrossfadeIdLikes,
      ],
    ).start({
      // mock にないリクエストは通してあげる
      onUnhandledRequest: "bypass",
    })
  }
}
