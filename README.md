API server based on [cep-scraper](https://github.com/codigourbano/cep-scraper).

# API Reference
* [Search postal code or address](#search)
* [Get postal code](#get-postalcode)
* [Get address](#get-address)

## Search

    GET /api/v1/search

### Input

* `term`: *string* search term

#### Response

Response

Object containing user data

Status codes:

* 200 Ok
* 400 Bad request

Response body:

* data [cep]

[back to index]

---

[back to index]: #api-reference
