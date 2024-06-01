# Aegis - The Password Manager

Securely stores and manages login credentials, eliminating the need for remembering multiple passwords.

## Features
* **Secure Storage:** Encrypts your passwords to protect them from unauthorized access.
* **Easy Management:** Add, edit, and delete passwords conveniently.
* Clean and Intuitive Design for easy navigation.

Sneek peek of the UI
![UI Image](https://i.imgur.com/hrsgkWL.png)

## Dependencies

* [Toastify](https://www.npmjs.com/package/react-toastify) (For toast notifications)
```javascript
npm i react-toastify
```
* [uuidv4](https://www.npmjs.com/package/uuidv4) (for generating v4 UUIDs)
```bash
npm i uuidv4
```
* [MongoDB Compass](https://www.mongodb.com/products/tools/compass) (Database of the project)
* And some other React hooks like useState, useRef, useEffect

## Usage and Installation 
1. Install npm.
```bash
npm install -g npm
```
2. Connect to the MongoDB database from the MongoDB Compass App. The default connection string is `mongodb://localhost:27017` you can change it to your own connection string by editing the `.env` file.
3. Navigate to `aegis-mongo\backend` and start the server to handle fetch APIs.
```bash
node --watch server.js
```
4. From the root directory, start the project.
```bash
npm run dev
```
Bingo! The project is up and running. Add a few passwords and have a look at it appear in the MongoDB database!
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

