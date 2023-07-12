import { Recherches } from "../type/type"

export const parseurTabChoix = (tabChoix: Recherches[]) => {
    return tabChoix.map((choix) => {
      return {
          sheet_id:choix.sheet_id
        }
    })
  }