import cppImg from "../assets/c.jpg";
import jsImg from "../assets/js.jpg";
import javaImg from "../assets/java.png";

const courses = [
  {
    id: 1,
    title: "The Ultimate C++ Series",
    description:
      "Master Modern C++: Go from Novice to Professional. Everything you need to code in C++ in one bundle!",
    image: cppImg,
    price: "14$",
    originalPrice: "85$",
    rating: 4.5,
    students: 3,
    lectures: 6,
  },
  {
    id: 2,
    title: "The Ultimate JavaScript Series",
    description:
      "Master JavaScript: Go from Novice to Professional. Everything you need to code in JavaScript in one bundle!",
    image: jsImg,
    price: "15$",
    originalPrice: "64$",
    rating: 5,
    students: 2,
    lectures: 1,
  },
  {
    id: 3,
    title: "The Ultimate Java Mastery Series",
    description:
      "Master Java - the most popular programming language underpinning most apps and websites.",
    image: javaImg,
    price: "27$",
    originalPrice: "99$",
    rating: 0,
    students: 0,
    lectures: 1,
  },
];

export default courses;
