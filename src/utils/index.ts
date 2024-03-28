import type { CategoryType } from '@/types'

export const renderStyleType = (pokemonType?: CategoryType) => {
  if (pokemonType) {
    switch (pokemonType.id) {
      case 1:
        return `<span class="red">${pokemonType.name}</span>`
      case 2:
        return `<span class="blue">${pokemonType.name}</span>`
      case 3:
        return `<span class="green">${pokemonType.name}</span>`
      case 4:
        return `<span class="yellow">${pokemonType.name}</span>`
      case 5:
        return `<span class="ice">${pokemonType.name}</span>`
      case 6:
        return `<span class="orange">${pokemonType.name}</span>`
      case 7:
        return `<span class="poison">${pokemonType.name}</span>`
      case 8:
        return `<span class="ground">${pokemonType.name}</span>`
      case 9:
        return `<span class="fly">${pokemonType.name}</span>`
      case 10:
        return `<span class="psychic">${pokemonType.name}</span>`
      case 11:
        return `<span class="bug">${pokemonType.name}</span>`
      case 12:
        return `<span class="rock">${pokemonType.name}</span>`
      case 13:
        return `<span class="ghost">${pokemonType.name}</span>`
      case 14:
        return `<span class="dark">${pokemonType.name}</span>`
      case 15:
        return `<span class="dragon">${pokemonType.name}</span>`
      case 16:
        return `<span class="steel">${pokemonType.name}</span>`
      case 17:
        return `<span class="fairy">${pokemonType.name}</span>`
      default:
        return `<span>${pokemonType.name}</span>`
    }
  }
}

export const renderType = (
  type1: number,
  type2: number,
  pokemonType: CategoryType[],
  renderStyleType: Function
) => {
  const pokemonType1 = pokemonType.find((item) => item.id === type1)
  const pokemonType2 = pokemonType.find((item) => item.id === type2)
  if (pokemonType1 && pokemonType2) {
    return [renderStyleType(pokemonType1), renderStyleType(pokemonType2)].join(' | ')
  }
  if (pokemonType1) {
    return renderStyleType(pokemonType1)
  }

  if (pokemonType2) {
    return renderStyleType(pokemonType2)
  }
  return '<></>'
}
