
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const foods = [
  { id: 1, name: "Bún bò Huế", imageUrl: "/images/ab.jpg", price: 45000, status: "Available", description: "Bún bò Huế thơm ngon, đậm đà hương vị miền Trung" },
  { id: 2, name: "Phở bò", imageUrl: "/images/ba.jpg", price: 40000, status: "Sold Out", description: "Phở bò truyền thống với nước dùng ngọt thanh" },
  { id: 3, name: "Miến", imageUrl: "/images/mien.jpg", price: 35000, status: "Sold Out", description: "Miến xào giòn với các loại rau củ tươi ngon" },
  { id: 4, name: "Mì", imageUrl: "/images/mi.jpg", price: 30000, status: "Available", description: "Mì trộn cay đậm đà phong cách Hàn Quốc" }
];

app.get('/api/foods', (req, res) => {
  res.json(foods);
});
app.get('/', (req, res) => {
  res.json('home');
});

app.get('/api/foods/:id', (req, res) => {
  const food = foods.find(f => f.id === parseInt(req.params.id));
  if (!food) return res.status(404).json({ message: 'Món ăn không tồn tại' });
  res.json(food);
});

app.use('/images', express.static('public/images'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For Vercel
