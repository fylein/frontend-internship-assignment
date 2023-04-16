export interface Book {
    key: string;
    title: string;
    author_name: string[],
    publish_year?: number[]
}

export interface SearchResponse{
    num_found: number,
    docs: Book[],
    start: number,
    offset: number
}
