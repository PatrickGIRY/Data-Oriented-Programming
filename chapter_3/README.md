# Chapter 3 : Basic data manipulation

## Design a data model

A data mind map of the Library Management System

```mermaid
mindmap
root((Library data))
    Catalog
        Books
        Authors
        Book items
        Book lendings
    User management
        Users
        Members
        Librarians
```

A data model of the Library Management System

```mermaid
classDiagram
class Library {
    name: String
    address: String
}

class Catalog

class Book {
    title: String
    publishingYear: Number
    ISBN: String
    publisher: String
}

class Author {
    name: String
}

class BookItem {
    libId: String
    purchaseDate: String
}

class UserManagement

class Librarian {
    email: String
    password: String
}

class Member {
    email: String
    password: String
}

class BookLending {
    lendingDate: String
}


Library *-- Catalog
Library *-- UserManagement
Catalog *-- "*" Book
Book "*" o--o "*" Author
Book *-- "*" BookItem
UserManagement *-- "*" Librarian
UserManagement *-- "*" Member
Member *-- "*" BookLending
BookLending o-- BookItem
```

Library management relation model. Dashed lines (e.g., between Book and Author) denote indirect relations, [String] denotes a positional collection of strings, and {Book} denotes an index of Books.

```mermaid
classDiagram
class Library {
    name: String
    address: String
    userManagement: UserManagement
}

class Catalog
    Catalog : booksByIsbn {Book}
    Catalog : authorsById {Author}

class Book {
    title: String
    publishingYear: Number
    ISBN: String
    publisher: String
    authorIds : [String]
    bookItems : [BookItem]
}

class Author {
    id: String
    name: String
    bookIsbms: [String]
}

class BookItem {
    id: String
    libId: String
    purchaseDate: String
    isLent: Boolean
}

class UserManagement
    UserManagement : librariansByEmail  {Librarian}
    UserManagement : membersByEmail  {Member}


class Librarian {
    email: String
    encryptedPasswords: String
}

class Member {
    email: String
    encryptedPassword: String
    bookLendings: [BookLending]
}

class BookLending {
    lendingDate: String
    bookItemId: String
    bookIsbm: String
}


Library *-- Catalog
Library *-- UserManagement
Catalog *-- "*" Book
Book "*" o..o "*" Author
Book *-- "*" BookItem
UserManagement *-- "*" Librarian
UserManagement *-- "*" Member
Member *-- "*" BookLending
BookLending o.. BookItem
```
