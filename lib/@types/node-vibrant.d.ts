declare module "node-vibrant" {
  interface Swatches {
    Vibrant: string
    Muted: string
    DarkVibrant: string
    DarkMuted: string
    LightVibrant: string
    LightMuted: string
  }

  class Vibrant {
    constructor(
      sourceImage: string | HTMLImageElement,
      opts?: {
        colorCount?: number
        quality?: number
      }
    )
    swatches(): Swatches
  }

  export default Vibrant
}
