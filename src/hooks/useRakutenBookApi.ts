import { getFromRakutenBookApi, ResponseItem, ResponseParameter, ErrorResponseParameter } from "@/api"
import { IS_MOCK_MODE } from "@/utils/mock"
import { AlertOptions } from "@ionic/core"
import { alertController } from "@ionic/vue"
import { computed, ref, Ref, watch } from "vue"
import { useRouter } from "vue-router"

function isErrorResponseParameter(res: ResponseParameter): res is ErrorResponseParameter {
  return "error" in res
}

function createErrorAlertOptions(res: ErrorResponseParameter, author: string): AlertOptions {
  switch (res.error) {
    case "wrong_parameter": {
      if (res.error_description === "specify valid applicationId") {
        return { message: "楽天APIの`applicationId`が正しく指定されていません。" }
      } else {
        return { message: "検索キーワードが正しくしていされていません。" }
      }
    }

    case "not_found":
      return {
        header: `「${author}」に一致するものが見つかりませんでした。`,
        message: "別のキーワードをお試しください。",
      }

    default:
      return {
        header: "エラー",
        message: JSON.stringify(res),
      }
  }
}

export function useRakutenBookApi(author: string) {
  const itemsRef = ref([]) as Ref<Array<ResponseItem>>
  const responseRef = ref<ResponseParameter>()
  const hasNextRef = computed(() => {
    if (IS_MOCK_MODE) {
      return true
    }
    const res = responseRef.value
    if (!res || isErrorResponseParameter(res)) {
      return false
    }
    return res.page < res.pageCount
  })
  const countTextRef = computed((): string => {
    const res = responseRef.value
    if (!res || isErrorResponseParameter(res)) {
      return ""
    }
    return `${res.page} / ${res.pageCount - 1}`
  })
  let nextPageCount = 1

  const next = async () => {
    const res = await getFromRakutenBookApi({ author, page: nextPageCount })
    responseRef.value = res
    if (isErrorResponseParameter(res)) {
      return
    }
    const newItems = res.Items.map(({ Item }) => Item)
    itemsRef.value = [...itemsRef.value, ...newItems]
    if (hasNextRef.value) {
      nextPageCount = res.page + 1
    }
  }

  const router = useRouter()
  watch(responseRef, async res => {
    if (!res || !isErrorResponseParameter(res)) {
      return
    }
    const option = createErrorAlertOptions(res, author)
    const alert = await alertController.create({
      ...option,
      buttons: ["OK"],
    })
    await alert.present()
    router.push("..")
  })

  return {
    itemsRef,
    hasNextRef,
    countTextRef,
    next,
  }
}
