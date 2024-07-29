import { z } from "zod"
import { components } from "./api/schema"

// 絵文字の文字数をカウントする
const countGrapheme = (string: string) => {
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" })
  return [...segmenter.segment(string)].length
}

const crossfadeSchema = z
  .object({
    id: z.string(),
    creatorId: z.string(),
    title: z.string(),
    liked: z.boolean(),
    icon: z.object({
      character: z.string(),
      backgroundColor: z.string(),
    }),
    songs: z.array(
      z.object({
        videoId: z.string(),
        start: z.number(),
        end: z.number(),
      }),
    ),
  })
  .superRefine((val, ctx) => {
    if (val.title.trim() === "") {
      ctx.addIssue({
        message: "タイトルは必須です。",
        code: z.ZodIssueCode.custom,
      })
    }

    if (val.songs.length === 0) {
      ctx.addIssue({
        message: "少なくとも1つの曲を追加してください。",
        code: z.ZodIssueCode.custom,
      })
    }

    if (countGrapheme(val.icon.character.trim()) !== 1) {
      console.log(val.icon.character.trim())
      ctx.addIssue({
        message: "アイコンは1文字である必要があります。",
        code: z.ZodIssueCode.custom,
      })
    }

    const colorRegex = /^#[0-9a-fA-F]{6}$/
    if (!colorRegex.test(val.icon.backgroundColor)) {
      ctx.addIssue({
        message: "色は16進数で表記してください。",
        code: z.ZodIssueCode.custom,
      })
    }

    const videoIdRegex = /^[a-zA-Z0-9_-]{11}$/
    val.songs.forEach((song, index) => {
      if (song.start >= song.end) {
        ctx.addIssue({
          message: `曲 ${index + 1} の開始時間は終了時間より前である必要があります。`,
          code: z.ZodIssueCode.custom,
        })
      }

      if (!videoIdRegex.test(song.videoId)) {
        ctx.addIssue({
          message: `曲 ${index + 1} の動画IDが不正です。`,
          code: z.ZodIssueCode.custom,
        })
      }
    })
  })

export { crossfadeSchema }

type Crossfade = components["schemas"]["Crossfade"]

type CrossfadeTypeFromSchema = z.infer<typeof crossfadeSchema>

type IsMatching<T, U> = T extends U ? (U extends T ? true : false) : false

type Check = IsMatching<Crossfade, CrossfadeTypeFromSchema>

// @ts-expect-error-next-line This is a type check
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _: Check = true
