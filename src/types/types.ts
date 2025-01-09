export type AuthDataType = {
    login: string; password: string;
}

export type AccountInfo = {
    companyLimit: number; usedCompanyCount: number
}

export type GetPosts = {
    inn: number;
    startDate: Date;
    endDate: Date;
    limit: number;
    onlyMainRole: boolean;
    onlyRiskFactors: boolean,
    excludeTechNews: boolean;
    excludeAnnouncements: boolean;
    excludeDigests: boolean;
}

export type Post = {
    "schemaVersion": string, "id": string, "version": number, "issueDate": Date, "url": string, "source": {
        "id": number,
        "groupId": number,
        "name": string,
        "categoryId": number,
        "levelId": number,
        "distributionMethodId": number
    }, "dedupClusterId": string, "plotClusterId": string, "title": {
        "text": string, "markup": string
    }, "content": {
        "markup": string
    }, "entities": {
        "companies": {
            "suggestedCompanies": [{
                "sparkId": number, "inn": string, "ogrn": string, "searchPrecision": string
            }],
            "resolveInfo": {
                "resolveApproaches": string[]
            },
            "tags": string[],
            "isSpeechAuthor": number,
            "localId": number,
            "name": string,
            "entityId": number,
            "isMainRole": number
        }[], "people": [], "themes": [{
            "localId": number, "name": string, "entityId": number, "tonality": string
        }[]], "locations": []
    }, "attributes": {
        "isTechNews": boolean,
        "isAnnouncement": boolean,
        "isDigest": boolean,
        "isSpeechRecognition": boolean,
        "isReducedContent": boolean,
        "influence": number,
        "wordCount": number,
        "coverage": {
            "state": string
        }
    }, "language": string
}