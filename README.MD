# nodejs-boilerplate
Start with 
```shell
    npm install
    nodeman app
```


## NodeJS and Express
Built with NodeJs and Express
It is modular structured to decouple functional units. You need some indepth understanding of Repository pattern, MVC Pattern and Modular architecture
with API versioning. API documentation generated with apiDoc comment syntax, you need to also be familiar with that too



### Installation
Clone repo 

`git clone https://github.com/samtax01/nodejs-boilerplate.git`

Install NPM dependencies with 


``npm install``

You may have install nodemon and run `nodemon app`

It will run in some default port `8099` but you can change the port by creating a local .env from .env-example

### API Documentation
After your updates, you need to generate the API Documentation by running

````npm run docs````

### DataBase Configuration

- Step 1: setup mondodb on local or  online. 
- Step 2: create environment file `cp .env.example .env`
- Step 3: update the mongoURI in the .env file.  

### Database Seeding 
You can fill the database with necessary information to make the application work smoothly.
The command to run the seeder file is:

````npm run seed````

### Accessing the application Endpoint 
