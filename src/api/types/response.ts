/**
 * 楽天ブックス書籍検索API 出力パラメーター(成功時)
 * @see https://webservice.rakuten.co.jp/api/booksbooksearch#outputParameter
 */
interface SuccessResponse {
  Items: Array<{ Item: ResponseItem }>

  pageCount: number
  page: number
  count: number
  last: number
  hits: number
  carrier: number
  GenreInformation: Array<unknown>
  first: number
}

/**
 * @see https://webservice.rakuten.co.jp/api/booksbooksearch#outputParameter
 */
interface ResponseItem {
  limitedFlag: number
  authorKana: string
  author: string
  subTitle: string
  seriesNameKana: string
  title: string
  subTitleKana: string
  itemCaption: string
  publisherName: string
  listPrice: number
  isbn: string
  largeImageUrl: string
  mediumImageUrl: string
  titleKana: string
  availability: string
  postageFlag: number
  salesDate: string
  contents: string
  smallImageUrl: string
  discountPrice: number
  itemPrice: number
  size: string
  booksGenreId: string
  affiliateUrl: string
  seriesName: string
  reviewCount: number
  reviewAverage: string
  discountRate: number
  chirayomiUrl: string
  itemUrl: string
}

/**
 * 楽天ブックス書籍検索API 出力パラメーター(エラー時)
 * @see https://webservice.rakuten.co.jp/api/booksbooksearch#aboutError
 */
interface ErrorResponse {
  error: string
  error_description: string
}

export type Response = SuccessResponse | ErrorResponse
