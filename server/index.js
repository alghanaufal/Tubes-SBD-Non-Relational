const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
const BookModel = require("./models/Book");

const app = express();
const routes = express.Router();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/bookstore"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

app.listen(3001, () => {
  console.log("server is running");
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ email: user.email }, "your-secret-key", {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true });
        res.json("success");
      } else {
        res.json("incorrect password");
      }
    } else {
      res.json("no existing user");
    }
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "invalid user" });
  } else {
    jwt.verify(token, "your-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ message: "invalid token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

app.get("/verify", verifyUser, (req, res) => {
  res.json({ message: "valid token", user: req.user });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/cover'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

app.post("/add", upload.single('image'), (req, res) => {
  BookModel.create(req.body)
    .then((books) => res.json(books))
    .catch((error) => res.json(error));
});
app.use("/api", routes);
routes.get("/books", async (req, res) => {
  try {
    const books = await BookModel.find();
    return res.json({ books });
  } catch (err) {
    return res.json(err);
  }
});
app.get("/api/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    return res.json({ book });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.delete("/api/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await BookModel.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    return res.json({ message: "Buku berhasil dihapus" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.put("/api/reset-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email tidak valid" });
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({ message: "Password lama salah" });
    }

    user.password = newPassword;
    await user.save();

    return res.json({ message: "Password berhasil diubah" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
