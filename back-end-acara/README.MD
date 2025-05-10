# Documentations
idk how to write a proper docs, so here it is
___
### Register

POST:BASEURL/api/auth/register \
Request Body:
```
{
    "fullName" : "string",
    "email" : "string",
    "username" : "string",
    "password" : "string",
    "confirmPassword" : "string"
}
```

### Login 

POST:BASEURL/api/auth/login \
Request Body:
```
{
    "identifier" : "string" //(username or email)
    "password" : "string"
}
```