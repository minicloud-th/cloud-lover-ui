import sword from "@/assets/item-sword.jpg";
import pet from "@/assets/item-pet.jpg";
import coins from "@/assets/item-coins.jpg";
import gameSkyblock from "@/assets/game-skyblock.jpg";
import gameAfk from "@/assets/game-afk.jpg";
import gamePets from "@/assets/game-pets.jpg";
import gameBlade from "@/assets/game-blade.jpg";


export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  image: string;
  description: string;
  highlights: string[];
};

export const thb = (n: number) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

export const products: Product[] = [
  {
    id: "blue-sword",
    name: "ไอเทมดาบฟ้า",
    category: "อาวุธ",
    price: 99,
    stock: 12,
    sold: 148,
    image: sword,
    description:
      "ดาบคริสตัลสีฟ้าเรืองแสง เอฟเฟกต์พิเศษเฉพาะตัว ส่งเข้าบัญชีอัตโนมัติทันทีหลังชำระเงิน",
    highlights: ["ส่งอัตโนมัติภายใน 1 นาที", "รับประกันไอเทมถาวร", "รองรับทุกเซิร์ฟเวอร์"],
  },
  {
    id: "cloud-pet",
    name: "สัตว์เลี้ยงเมฆ",
    category: "สัตว์เลี้ยง",
    price: 149,
    stock: 8,
    sold: 96,
    image: pet,
    description:
      "เพื่อนคู่ใจปุยเมฆสุดน่ารัก เพิ่มโบนัสเก็บของอัตโนมัติขณะ AFK พร้อมสกินพิเศษ",
    highlights: ["โบนัสเก็บของ AFK", "สกินหายาก", "เทรดได้ในเกม"],
  },
  {
    id: "cloud-coins",
    name: "เหรียญคลาวด์ 10,000",
    category: "สกุลเงิน",
    price: 199,
    stock: 43,
    sold: 421,
    image: coins,
    description:
      "แพ็กเหรียญในเกมสำหรับอัปเกรดไอเทมและซื้อของในร้านค้า เติมเข้าบัญชีทันทีแบบอัตโนมัติ",
    highlights: ["เติมทันที 24 ชม.", "ราคาถูกที่สุด", "ปลอดภัย 100%"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export type Game = {
  id: string;
  name: string;
  tag: string;
  players: string;
  image: string;
};

export const games: Game[] = [
  {
    id: "sky-battle",
    name: "Sky Battle Islands",
    tag: "ผจญภัย",
    players: "12.4K",
    image: gameSkyblock,
  },
  { id: "afk-farm", name: "AFK Coin Farm", tag: "AFK / Idle", players: "8.9K", image: gameAfk },
  { id: "pet-cloud", name: "Cloud Pet Simulator", tag: "สัตว์เลี้ยง", players: "15.2K", image: gamePets },
  { id: "blade-defense", name: "Blade Defense", tag: "ต่อสู้", players: "6.1K", image: gameBlade },
];

