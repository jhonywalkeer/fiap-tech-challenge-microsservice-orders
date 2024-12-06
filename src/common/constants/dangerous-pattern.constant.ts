export const DangerousPatterns: RegExp[] = [
  /<.*?>/g,
  /&.*?;/g,
  /['";]/g,
  /--/g,
  /\/\*.*?\*\//g,
  /#.*$/gm,
  /%/g,
  /\\/g
]
