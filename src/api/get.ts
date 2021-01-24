import axios, { AxiosResponse } from "axios"

import { IS_MOCK_MODE } from "@/utils/mock"
import { OptionalRequestParameter, RequestParameter, ResponseParameter } from "./types/"

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const BASE_AXIOS = axios.create({
  method: "GET",
  baseURL: "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404",
  params: {
    format: "json",
    applicationId: process.env.VUE_APP_RAKUTEN_API_APPLICATION_ID,
    sort: "+releaseDate",
  } as OptionalRequestParameter,
})

export async function getFromRakutenBookApi(params: RequestParameter): Promise<ResponseParameter> {
  if (IS_MOCK_MODE) {
    await sleep(1000)
    return require("./mock.json") as ResponseParameter
  }
  const res = await BASE_AXIOS.get<RequestParameter, AxiosResponse<ResponseParameter>>("./", {
    params,
  })
  return res.data
}
