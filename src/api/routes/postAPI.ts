import {baseAPI} from "../baseAPI.ts";
import {GetPosts} from "../../types/types.ts";
import axios from "axios";

export const postAPI = {
    async getPosts(payload: GetPosts) {
        try {
            const {data} = await baseAPI.post("/objectsearch", {
                "issueDateInterval": {
                    "startDate": payload.startDate, "endDate": payload.endDate
                },
                "searchContext": {
                    "targetSearchEntitiesContext": {
                        "targetSearchEntities": [{
                            "type": "company",
                            "sparkId": null,
                            "entityId": null,
                            "inn": payload.inn,
                            "maxFullness": true,
                            "inBusinessNews": null
                        }],
                        "onlyMainRole": payload.onlyMainRole,
                        "tonality": "any",
                        "onlyWithRiskFactors": payload.onlyRiskFactors,
                        "riskFactors": {
                            "and": [], "or": [], "not": []
                        },
                        "themes": {
                            "and": [], "or": [], "not": []
                        }
                    }, "themesFilter": {
                        "and": [], "or": [], "not": []
                    }
                },
                "searchArea": {
                    "includedSources": [], "excludedSources": [], "includedSourceGroups": [], "excludedSourceGroups": []
                },
                "attributeFilters": {
                    "excludeTechNews": payload.excludeTechNews,
                    "excludeAnnouncements": payload.excludeAnnouncements,
                    "excludeDigests": payload.excludeDigests
                },
                "similarMode": "duplicates",
                "limit": payload.limit,
                "sortType": "sourceInfluence",
                "sortDirectionType": "desc",
                "intervalType": "month",
                "histogramTypes": ["totalDocuments", "riskFactors"]
            });

            if (data.items.length < 1) {
                return []
            }

            const response = await baseAPI.post('/documents', {
                ids: data.items.map((item: {
                    encodedId: string
                }) => item.encodedId)
            });

            return response.data.map((value: never) => Object.values(value)[0]);

        } catch (e) {
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.message, success: false,
                };
            } else {
                console.log("Unexpected error:", e);
            }
        }
    },

    async getHistograms(payload: GetPosts) {
        try {
            const {data} = await baseAPI.post('/objectsearch/histograms', {
                "issueDateInterval": {
                    "startDate": payload.startDate, "endDate": payload.endDate
                },
                "searchContext": {
                    "targetSearchEntitiesContext": {
                        "targetSearchEntities": [{
                            "type": "company",
                            "sparkId": null,
                            "entityId": null,
                            "inn": payload.inn,
                            "maxFullness": true,
                            "inBusinessNews": null
                        }],
                        "onlyMainRole": payload.onlyMainRole,
                        "tonality": "any",
                        "onlyWithRiskFactors": payload.onlyRiskFactors,
                        "riskFactors": {
                            "and": [], "or": [], "not": []
                        },
                        "themes": {
                            "and": [], "or": [], "not": []
                        }
                    }, "themesFilter": {
                        "and": [], "or": [], "not": []
                    }
                },
                "searchArea": {
                    "includedSources": [], "excludedSources": [], "includedSourceGroups": [], "excludedSourceGroups": []
                },
                "attributeFilters": {
                    "excludeTechNews": payload.excludeTechNews,
                    "excludeAnnouncements": payload.excludeAnnouncements,
                    "excludeDigests": payload.excludeDigests
                },
                "similarMode": "duplicates",
                "limit": payload.limit,
                "sortType": "sourceInfluence",
                "sortDirectionType": "desc",
                "intervalType": "month",
                "histogramTypes": ["totalDocuments", "riskFactors"]
            });
            return data.data.map((value: {data: {date: Date, value: number}}) => value.data);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return {
                    error: e?.response?.data?.message, success: false,
                };
            } else {
                console.log("Unexpected error:", e);
            }
        }
    }
}