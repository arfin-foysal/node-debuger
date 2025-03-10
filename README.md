Here is a properly structured **README.md** file for your **debug-utils** NPM package:

---

# 📦 debug-utils

**A simple debugging utility for logging, dumping, and Express.js response debugging.**  
Easily debug your Node.js applications with structured logs, colored output, and Express.js support.

---

## 🚀 Installation

Install the package using **npm** or **yarn**:

```sh
npm install debug-utils
```

or

```sh
yarn add debug-utils
```

---

## 📖 Usage

### 1️⃣ **Basic Debugging**

Import the package in your Node.js project:

```js
const { dd, dump } = require("debug-utils");
```

#### 🔹 `dump(...data)` - Logs data without stopping execution

```js
dump("Hello, World!", { name: "Alice", age: 25 });
```
**Example Output:**
```
██████████████████████████████████████████████
🔍 DUMP at 2025-03-10T10:00:00.000Z
██████████████████████████████████████████████

👉 Param 1:
'Hello, World!'

👉 Param 2:
{ name: 'Alice', age: 25 }
```

---

#### 🔹 `dd(...data)` - Logs data and stops execution

```js
dd("Fatal Error", { error: "Something went wrong", code: 500 });
```
**Example Output (Execution Stops After This):**
```
██████████████████████████████████████████████
🔍 DUMP & DIE at 2025-03-10T10:00:00.000Z
██████████████████████████████████████████████

👉 Param 1:
'Fatal Error'

👉 Param 2:
{ error: 'Something went wrong', code: 500 }

🚫 Execution stopped.
```

---

### 2️⃣ **Using in an Express.js API**

`dump` and `dd` can also work with Express.js response objects.

#### 🔹 `dd(res, ...data)` - Sends JSON response and stops execution

```js
const express = require("express");
const { dd, dump } = require("debug-utils");

const app = express();

app.get("/", (req, res) => {
  dd(res, { success: false, message: "An error occurred" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

**Example JSON Response:**
```json
{
  "status": "terminated",
  "timestamp": "2025-03-10T10:00:00.000Z",
  "data": [
    {
      "success": false,
      "message": "An error occurred"
    }
  ]
}
```
*(Execution stops after sending the response.)*

---

#### 🔹 `dump(res, ...data)` - Sends JSON response but continues execution

```js
app.get("/debug", (req, res) => {
  dump(res, { message: "Debugging API response" });
  console.log("This will still run.");
});
```

**Example JSON Response:**
```json
{
  "status": "debug",
  "timestamp": "2025-03-10T10:00:00.000Z",
  "data": [
    {
      "message": "Debugging API response"
    }
  ]
}
```
*(Execution continues after sending the response.)*

---

## ⚙️ Configuration (Optional)

By default, logs print to the console. You can also enable logging to a file.

1. Open `index.js` in `debug-utils`
2. Set `LOG_TO_FILE = true`  
3. Logs will be saved in `debug.log`

```js
const LOG_TO_FILE = true; // Enables logging to file
```

---

## 📜 License

This package is licensed under the **MIT License**.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`feature-xyz`)
3. Commit changes and push
4. Open a pull request

---

## 🌟 Support

If you find this package helpful, **please star ⭐ the repo and share!**  
For issues, open a GitHub issue or contact me.

---

This README provides **clear installation, usage examples, Express.js integration, and configuration** details, making it **developer-friendly**! 🚀
