type Mods = Record<string, boolean | string>;

/**
 *
 * @param cls - base class
 * @param mods - modifications applied with conditional flags
 * @param additional - additional classes
 * @returns concatenated className string
 */
export function classNames(
  cls: string,
  mods: Mods = {},
  additional: string[]
): string {
  return [
    cls,
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
    ...additional,
  ].join(" ");
}
