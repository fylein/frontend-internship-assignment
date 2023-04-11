export interface Author {
  key: string;
  name: string;
}

export interface Availability {
  status: string;
  available_to_browse: boolean;
  available_to_borrow: boolean;
  available_to_waitlist: boolean;
  is_printdisabled: boolean;
  is_readable: boolean;
  is_lendable: boolean;
  is_previewable: boolean;
  identifier: string;
  isbn: string;
  oclc: null;
  openlibrary_work: string;
  openlibrary_edition: string;
  last_loan_date: string;
  num_waitlist: string;
  last_waitlist_date: string;
  is_restricted: boolean;
  is_browseable: boolean;
  __src__: string;
}

export interface Book {
  key: string;
  title: string;
  edition_count: number;
  cover_id: number;
  cover_edition_key: string;
  subject: string[];
  ia_collection: string[];
  lendinglibrary: boolean;
  printdisabled: boolean;
  lending_edition: string;
  lending_identifier: string;
  authors?: Author[];
  author_key?: string[];
  author_name?: string[];
  first_publish_year?: number;
  ia: string;
  public_scan: boolean;
  has_fulltext: boolean;
  availability: Availability;
}

export interface BookResponse {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: Book[];
}

export interface SearchResponse {
  start: number
  numFound: number
  docs: any[]
}

export interface Doc {
  title: string;
  title_suggest: string;
  title_sort: string;
  edition_count: number;
  edition_key: any[];
  publish_date: any[];
  publish_year: any[];
  first_publish_year: number;
  isbn: any[];
  last_modified_i: number;
  ebook_count_i: number;
  ebook_access: string;
  has_fulltext: boolean;
  public_scan_b: boolean;
  publisher: any[];
  language: any[];
  author_key: any[];
  author_name: any[];
  publisher_facet: any[];
  _version_: number;
  author_facet: any[];
}