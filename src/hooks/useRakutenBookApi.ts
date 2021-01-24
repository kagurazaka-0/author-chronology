import {
  getFromRakutenBookApi,
  ResponseParameter,
  ErrorResponseParameter,
  ResponseItemWithDateTime,
  ResponseItem,
} from "@/api"
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

const SALES_DATE_REGEX = /^(\d{4})年(\d{2})月(\d{2}日頃?)?$/

function createSalesDateTime(item: ResponseItem): Date {
  const { salesDate } = item
  const match = SALES_DATE_REGEX.exec(salesDate)
  if (!match) {
    console.warn("`ResponseItem.saleDate` is not match `/^(d{4})年(d{2})月(d{2}日頃)?$/.`", item)
    return null!
  }
  const [, yearStr, monthStr, , dayStr] = match
  const year = Number(yearStr)
  const month = Number(monthStr)
  const day = dayStr != null ? Number(dayStr) : 1

  return new Date(year, month - 1, day)
}

export function useRakutenBookApi(author: string) {
  const itemsRef = ref([]) as Ref<Array<ResponseItemWithDateTime>>
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
    const newItems = res.Items.map<ResponseItemWithDateTime>(({ Item }) => {
      const salesDateTime = createSalesDateTime(Item)
      const [year, month] = <const>[salesDateTime.getFullYear(), salesDateTime.getMonth() + 1]
      const salesDateText = `${year}/${month}`
      return { ...Item, salesDateTime, salesDateText }
    })
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
