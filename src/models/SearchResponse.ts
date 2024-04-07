import { ContentBase } from "./ContentModel";


export interface SearchResponse {
    Response: "True" | "False"
    Search: Array<ContentBase>
    totalResults: string
}