const moduleRegex = /\$module (.*)/iu

export type ParsedModuleName = {
    name: string
    markdown: string
}

export const isModuleName = (line: string): boolean => {
    const groups = line.match(moduleRegex)
    return Boolean(groups)
}

// --: (number) Number of whatever is done or nil if an error occurred
export const parseModuleName = (line: string): ParsedModuleName => {
    const groups = line.match(moduleRegex)
    if (!groups) throw new Error(`Line "${line}" does not define a valid module name`)

    const [, name] = groups

    const parsedName = name
        .split(' ')
        .map((part) => part.toLowerCase())
        .join('_')

    return { name: parsedName, markdown: `# ${name}` }
}
