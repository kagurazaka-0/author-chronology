import { EitherRequired } from "@/utils/types"

/**
 * 楽天ブックス書籍検索API 入力パラメーター(必須項目)
 * @see https://webservice.rakuten.co.jp/api/booksbooksearch#inputParameter
 */
type RequiredRequestParameter = EitherRequired<{
  /** 書籍タイトル */
  title: string
  /** 著者名 */
  author: string
  /** 出版社名 */
  publisherName: string
  /** 書籍のサイズ */
  size: number
  /** ISBNコード */
  isbn: string
  /** 楽天ブックスジャンルID */
  booksGenreId: string
}>

/**
 * 楽天ブックス書籍検索API 入力パラメーター(任意項目)
 * @see https://webservice.rakuten.co.jp/api/booksbooksearch#inputParameter
 */
type OptionalRequestParameter = {
  /** アプリID */
  applicationId?: string
  /** アフィリエイトID */
  affiliateId?: string
  /** レスポンス形式 */
  format?: "json" | "xml"
  /** コールバック関数名 */
  callback?: string
  /** 出力パラメーター指定 */
  elements?: string
  /** 出力フォーマットバージョン */
  formatVersion?: number
  /** 1ページあたりの取得件数 */
  hits?: number
  /** 取得ページ */
  page?: number
  /** 在庫状況 */
  availability?: number
  /** 品切れ等購入不可商品表示フラグ */
  outOfStockFlag?: number
  /** チラよみフラグ */
  chirayomiFlag?: number
  /**
   * ソート
   *
   * |||
   * |-:|-|
   * |"standard"|標準|
   * |"sales"|売れている|
   * |"+releaseDate"|発売日(古い)|
   * |"-releaseDate"|発売日(新しい)|
   * |"+itemPrice"|価格が安い|
   * |"-itemPrice"|価格が高い|
   * |"reviewCount"|レビューの件数が多い|
   * |"reviewAverage"|レビューの評価(平均)が高い|
   */
  sort?:
    | "standard"
    | "sales"
    | "+releaseDate"
    | "-releaseDate"
    | "+itemPrice"
    | "-itemPrice"
    | "reviewCount"
    | "reviewAverage"

  /** 限定フラグ */
  limitedFlag?: number
  /** キャリア */
  carrier?: number
  /** ジャンルごとの商品数取得フラグ【NEW】 */
  genreInformationFlag?: number
}

/** 楽天ブックス書籍検索API 入力パラメーター */
export type RequestParameter = RequiredRequestParameter & OptionalRequestParameter
