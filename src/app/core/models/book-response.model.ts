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
  authors: Author[];
  first_publish_year: number;
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
