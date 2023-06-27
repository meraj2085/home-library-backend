### Live Link: https://digital-cow-hut-theta.vercel.app/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/648e7a42180e6ce0192907b2 (Single GET)
- api/v1/users/648e7a42180e6ce0192907b2 (PATCH)
- api/v1/users/648e7a42180e6ce0192907b2 (DELETE)

#### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/648e7b6f180e6ce0192907bb (Single GET)
- api/v1/cows/648e7b6f180e6ce0192907bb (PATCH)
- api/v1/cows/648e7b6f180e6ce0192907bb (DELETE)

### Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=80000
- api/v1/cows?location=Dhaka
- api/v1/cows?searchTerm=80000

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
