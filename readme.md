1.create an api for signup for user
firstname,last name,email,phone number,password
2.create an api for login using email and pass, and phone number and pass.(user can login after approved by admin )
3 .create an api for get user detalis by using jwt token and get only email ,firstname ,lastname
4.create an api for geting data bw 2 collections using aggrigate

5. Sum up quantity having same price
let data = [
  {
    price:20,
    quantity : 25,
    option :"yes"
  },
  {
    price:12,
    quantity : 25,
    option :"yes"
  },
  {
    price:20,
    quantity : 25,
    option :"no"
  },
  {
    price:15,
    quantity : 25,
    option :"yes"
  },
  {
    price:15,
    quantity : 5,
    option :"no"
  }
]

O/P
[
{
  Price:20,
    quantity : 50,
    option :”yes”
},
{
  Price:12,
    quantity : 25,
    option :”yes”
},
{
  price:15,
    quantity : 30,
    option :”yes”
}
]

all the api's are in index.js except of fourth api where it need to aggregate two collection of database