import { Product } from "@/utils/product";

export const products: Product[] = [
  // Jeans
  {
    id: "jeans1",
    name: "Slim Fit Blue Jeans",
    description: "Comfortable slim fit blue jeans for casual wear.",
     rating: 3.7,
     reviewCount: 142,
    price: 1499,
    image: "/images/products/b2.jpg",
    images: [
      "/images/products/b1.jpg",
            "/images/products/b3.jpg",


    ],
    category: "jeans",
    brand: "Fashion Hero",
    size: ["S", "M", "L", "XL"],
    color: ["Blue", "Dark Blue"],
    style: "Slim Fit",
  },
  {
    id: "jeans2",
    name: "Distressed Grey Jeans",
    description: "Trendy distressed jeans with a grey wash.",
     rating: 4.8,
     reviewCount: 1222,
    price: 1699,
    image: "/images/products/j1.jpg",
    images: [
      "/images/products/j2.jpg",
            "/images/products/j3.jpg",


    ],
    category: "jeans",
    brand: "Urban Classic",
    size: ["M", "L"],
    color: ["Grey"],
    style: "Distressed",
  },
  {
    id: "jeans3",
    name: "Regular Fit Black Jeans",
    description: "Classic black jeans for everyday wear.",
     rating: 4.9,
     reviewCount: 122,
    price: 1399,
    image: "/images/products/j4.jpg",
     images: [
      "/images/products/j5.jpg",
            "/images/products/j6.jpg",


    ],
    category: "jeans",
    brand: "Denim Pro",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Black"],
    style: "Regular",
  },

  // Hoodies
  {
    id: "hoodie1",
    name: "Pullover Hoodie",
    description: "Soft cotton pullover hoodie in pastel colors.",
     rating: 3.0,
     reviewCount: 23,
    price: 1199,
    image: "/images/products/ph1.jpg",
     images: [
      "/images/products/ph2.jpg",
            "/images/products/ph3.jpg",


    ],
    category: "hoodie",
    brand: "CozyWear",
    size: ["S", "M", "L", "XL"],
    color: ["Pink", "Beige", "Blue"],
    style: "Casual",
  },
  {
    id: "hoodie2",
    name: "Zip-Up Hoodie",
    description: "Zippered hoodie with a brushed inner fleece.",
     rating: 3.3,
     reviewCount: 22,
    price: 1499,
    image: "/images/products/zh1.jpg",
     images: [
      "/images/products/zh2.jpg",
            "/images/products/zh3.jpg",


    ],
    category: "hoodie",
    brand: "Urban Fit",
    size: ["M", "L", "XL"],
    color: ["Navy", "Black"],
    style: "Urban",
  },
  {
    id: "hoodie3",
    name: "Graphic Print Hoodie",
    description: "Hoodie with bold streetwear graphic print.",
     rating: 2.9,
     reviewCount: 12,
    price: 1599,
    image: "/images/products/gp2.jpg",
     images: [
      "/images/products/gp1.jpg",
            "/images/products/gp3.jpg",


    ],
    category: "hoodie",
    brand: "GraphiStyle",
    size: ["S", "M", "L"],
    color: ["White", "Black"],
    style: "Streetwear",
  },

  // Shirts
  {
    id: "shirt1",
    name: "Formal White Shirt",
    description: "Perfect for office or formal occasions.",
     rating: 3.1,
     reviewCount: 122,
    price: 999,
    image: "/images/products/wh3.jpg",
    images: [
      "/images/products/wh1.jpg",
            "/images/products/wh3.jpg",


    ],

    category: "shirts",
    brand: "Elite Wear",
    size: ["S", "M", "L", "XL"],
    color: ["White"],
    style: "Formal",
  },
  {
    id: "shirt2",
    name: "Checked Casual Shirt",
    description: "Multi-color checked pattern shirt for casual looks.",
     rating: 3.1,
     reviewCount: 12,
     
    price: 1099,
    image: "/images/products/ch1.jpg",
     images: [
      "/images/products/ch2.jpg",
            "/images/products/ch3.jpg",

    ],
    category: "shirts",
    brand: "Fashion Hero",
    size: ["M", "L", "XL"],
    color: ["Red", "Blue"],
    style: "Casual",
  },
  {
    id: "shirt3",
    name: "Linen Mandarin Shirt",
    description: "Breathable linen shirt with mandarin collar.",
    price: 1199,
     rating: 3.1,
     reviewCount: 242,
    image: "/images/products/el1.jpg",
     images: [
      "/images/products/el2.jpg",
            "/images/products/el3.jpg",


    ],
    category: "shirts",
    brand: "Natural Vibe",
    size: ["M", "L"],
    color: ["Beige"],
    style: "Ethnic",
  },

  // Shorts
  {
    id: "shorts1",
    name: "Cotton Lounge Shorts",
    description: "Comfy shorts for home and casual walks.",
     rating: 3.5,
     reviewCount: 300,
    price: 799,
    image: "/images/products/cg1.jpg",
     images: [
      "/images/products/cg2.jpg",
            "/images/products/cg3.jpg",
            "/images/products/cg3.jpg",


    ],
    category: "shorts",
    brand: "ChillWear",
    size: ["M", "L", "XL"],
    color: ["Grey", "Black"],
    style: "lounge",
  },
  {
    id: "shorts2",
    name: "Cargo Utility Shorts",
    description: "Stylish cargo shorts with multiple pockets.",
    price: 999,
    reviewCount: 345,
   rating: 3.5,
    image: "/images/products/cl1.jpg",
     images: [
      "/images/products/cl2.jpg",
            "/images/products/cl3.jpg",


    ],
    category: "shorts",
    brand: "Utility Mode",
    size: ["S", "M", "L"],
    color: ["Khaki", "Olive"],
    style: "Utility",
  },
  {
    id: "shorts3",
    name: "Athletic Mesh Shorts",
    description: "Breathable mesh shorts for workout and gym.",
 rating: 4.9,
 reviewCount: 1422,
    price: 899,
    image: "/images/products/ath1.jpg",
     images: [
      "/images/products/ath2.jpg",
            "/images/products/ath3.jpg",


    ],
    category: "shorts",
    
    brand: "FitStyle",
    size: ["M", "L", "XL"],
    color: ["Black", "Blue"],
    style: "Sport",
  },

  // T-Shirts
  {
    id: "tshirt1",
    name: "Plain Black T-Shirt",
    description: "Everyday plain round neck t-shirt.",
    rating: 3.9,
    reviewCount: 114,
    price: 499,
    image: "/images/products/t1.jpg",
     images: [
      "/images/products/t2.jpg",
            "/images/products/t3.jpg",


    ],
    category: "tshirts",
    brand: "Fashion Hero",
    size: ["S", "M", "L", "XL"],
    color: ["Black"],
    style: "Basic",
  },
  {
    id: "tshirt2",
    name: "Graphic Print Tee",
    description: "Trendy graphic printed t-shirt for streetwear.",
    rating: 4.1,
    reviewCount: 1722,
    price: 699,
    image: "/images/products/gp1.jpg",
     images: [
      "/images/products/gp2.jpg",
            "/images/products/gp3.jpg",


    ],
    category: "tshirts",
    brand: "GraphiStyle",
    size: ["M", "L"],
    color: ["White", "Grey"],
    style: "Street",
  },
  {
    id: "tshirt3",
    name: "Oversized Tee",
    description: "Loose-fit t-shirt for relaxed vibes.",
    
    rating: 4.2,
    reviewCount: 254,
    price: 749,
    image: "/images/products/oz2.jpg",
     images: [
      "/images/products/oz1.jpg",
            "/images/products/oz3.jpg",


    ],
    category: "tshirts",
    brand: "Relax Fit",
    size: ["L", "XL", "XXL"],
    color: ["Beige", "Sage"],
    style: "Oversized",
  }
  
];
