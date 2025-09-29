export type typeCommand = {
    command: string;
    output?: string | typeDirectory;
    path?: string;
    snapshot?: typeDirectory;
    qrPath?: string;
}

export type typeCommandList = {
    command: string;
    description: string;
}

export type typeCommandMap = {
    [key: string]: string;
}

export type typeDirectory<T = any> = {
    directory: string;
    subdirectories: typeDirectory<T>[];
    data?: string;
    files: typeFile[];
}

export type typeFile = {
    name: string;
    data: string;
    isRootOnly: boolean;
    isHidden?: boolean;
}

export type typeLog = {
    timestamp: string;
    command: string;
}

export type typeDnsResponse = {
    Status: number;
    Answer: typeDnsResponseAnswer[];
}

export type typeDnsResponseAnswer = {
    TTL: number;
    data: string;
    name: string;
    type: number;
}

export type Explain = {
  name: string;
  synopsis: string;
  purpose: string;
  examples: { cmd: string; why: string; }[];
  notes?: string[];
  seeAlso?: string[];
  explanation?: string;
};