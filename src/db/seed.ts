import { faker } from "@faker-js/faker";
import { neon } from "@neondatabase/serverless";
import { Index } from "@upstash/vector";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { hfVectorize } from "../lib/vectorize";
import { productsTable } from "./schema";

dotenv.config();

const index = new Index();

async function main() {
  const connector = neon(process.env.DATABASE_URL!);

  const db = drizzle(connector);

  const products: (typeof productsTable.$inferInsert)[] = [];

  const productImageIDs = [
    {
      imageId: "silver_womens_watch.jpg.avif",
      description:
        "Silver Womens Watch, Vintage Women Wrist Watches, Retro Roman Numeral Watch, Minimalist Adjustable Size Wrist Watch, Present for her",
    },
    {
      imageId: "women_stainless_steel_watch.jpg.avif",
      description:
        "Watch for women, stainless steel watch, lovely vintage watch for her, daily use women watch, roman numeral dial watch, best gift for her",
    },
    {
      imageId: "gold_womens_watch.jpg.avif",
      description:
        "Gold Womens Watch, Vintage Roman Numeral Oval Watch, Minimalist Wrist Watch, Dainty Wristwatch for women, Daily Usage Watch, Present for Her",
    },
    {
      imageId: "gold_silver_tank_watch.jpg.avif",
      description:
        "Gold & Silver Tank Watch for Women, Vintage Watch, Minimalist Adjustable Wristwatch, Stainless Steel Luxury Watches, Roman Numeral Watch",
    },
    {
      imageId: "gold_vintage_watch.jpg.avif",
      description:
        "Gold vintage watch for women, Silver dainty watch, Luxury brand tank watch, Adjustable band wrist size, Best quality watch as a present",
    },
    {
      imageId: "minimal_vintage_watch.jpg.avif",
      description:
        "Minimal Womens Watch, Gold Womens Wrist Watch, Vintage Women Watch, Retro Watch For Women, Daily Usage Adjustable Watch, Present Idea",
    },
    {
      imageId: "vintage_cartier_watch.jpg.avif",
      description:
        "Vintage Cartier Ladies Watch with Round Diamonds in 18k White Gold, Cartier 28mm Watch in 18k White Gold and Diamonds, Cartier Diamond Watch",
    },
    {
      imageId: "cartier_tortue_watch.jpg.avif",
      description:
        "Cartier Tortue Ladies Watch 18kt Rose Gold With Original Cartier Box | Cartier Tortue Tonneau Shape 31mm Dial Manual Wind Vintage Watch",
    },
    {
      imageId: "van_cleef_arpels_watch.jpg",
      description:
        "Pre-Owned Van Cleef & Arpels 18K Solid Gold 37MM Black Dial Automatic Watch in Gold Bracelet | Van Cleef and Arpels Unisex 18K Gold Watch",
    },
    {
      imageId: "minimalist_mens_watch.jpg.avif",
      description:
        "Minimalist Men's Matte Black Eclipse | Wrist Watch (Mesh Band) - By Venici Times",
    },
    {
      imageId: "vintage_mens_silver_watch.jpg.avif",
      description:
        "Vintage Watch, Melting Watch, Mens Silver Watch, Crash Watch, Men Watch, Salvador Dali Watch, Unique Watch, Gift For Him, Gifts For Men",
    },
    {
      imageId: "vintage_mens_gold_watch.jpg.avif",
      description:
        "Vintage Watch, Melting Watch, Mens gold Watch, Crash Watch, Men Watch, Salvador Dali Watch, Unique Watch, Gift For Him, Gifts For Men",
    },
    {
      imageId: "moss_agate_opal_ring.jpg.avif",
      description:
        "Moss Agate Opal Ring Engagement Ring Pear Cut Gems Art Deco Moissanite Wedding Band 3 Stone Unique Women Bridal Promise Ring Customized",
    },
    {
      imageId: "art_deco_platinum_ring.jpg.avif",
      description:
        "Art Deco Platinum Baguette Diamond GIA Certified 8.70 Carat Lightning Ridge Black Opal Engagement Ring - GIA Australian Black Opal Ring",
    },
    {
      imageId: "platinum_alexandrite_ring.jpg.avif",
      description: "Platinum 1.91 Carat Alexandrite Ring",
    },
    {
      imageId: "heavy_gents_gold_ring.jpg.avif",
      description:
        "HEAVY Gents 18K Yellow Gold with a LARGE 16.35ct Natural Australian Boulder Black Opal Ring",
    },
    {
      imageId: "gold_diamond_sapphire_ring.jpg.avif",
      description: "18k gold ring with diamonds and sapphires",
    },
    {
      imageId: "gia_paraiba_tourmaline_ring.jpg.avif",
      description: "GIA Paraiba Tourmaline - Diamonds Ring",
    },
    {
      imageId: "gia_certified_diamond_ring.jpg.avif",
      description:
        "2.05ct GIA-Certified Old European Cut Diamond Engagement Ring. Platinum Ring.",
    },
    {
      imageId: "gold_blue_sapphire_diamond_ring.jpg.avif",
      description:
        "60% OFF Liquidation Clearance!! Accepting Best Offers!! NWT 132,200 Rare Gorgeous 18KT Gold Fancy Ceylon Blue Sapphire Diamond Ring",
    },
    {
      imageId: "flower_necklace.jpg.avif",
      description:
        "flower necklace,Tiny Flower Necklace,Dainty Necklace,White Flower Jewelry,Minimalist,Personalized Gifts",
    },
    {
      imageId: "emerald_green_necklace.jpg.avif",
      description:
        "Emerald Green Necklace, May Birthstone Pendant, Gold Filled Emerald Necklace, Tiny Silver Teardrop Emerald Choker Necklace",
    },
    {
      imageId: "wave_necklace.jpg.avif",
      description:
        "Wave Necklace 925 Sterling Silver,Birthday gift women,Surf Jewellery,Gift For Her,Wave Pendant,Birthday Woman,Ocean Jewellery,Charity",
    },
    {
      imageId: "starburst_layered_necklace.jpg.avif",
      description:
        "Layered Necklace by Caitlyn Minimalist • Diamond Star Necklace, Celestial Jewelry • Minimalist Style • Gift for Women • NR051",
    },
    {
      imageId: "chunky_dome_drop_necklace.jpg.avif",
      description:
        "Chunky Dome Drop Necklace for Women - Glossy Thick Teardrop Hoop Necklace - bottega necklace Lightweight - Kylie Gold Pendant Necklace",
    },
    {
      imageId: "mens_bar_necklace.jpg.avif",
      description:
        "Mens Bar Necklace, Personalized Gift For Him, Mens Jewelry, Guys Necklace, Travel Necklace, Mens Custom Necklace, Anniversary Gifts For Him",
    },
    {
      imageId: "ancient_roman_coin_necklace.jpg.avif",
      description:
        "Ancient roman dinar coin necklace for men / men's pendant / sterling silver or stainless steel chain / Gift for him / ceasar necklace",
    },
    {
      imageId: "black_tourmaline_necklace.jpg.webp",
      description:
        "Real raw black tourmaline necklace unique gift for him Handmade rough gemstone necklace Black stone necklace for men anxiety necklace",
    },
  ];

  productImageIDs.forEach(({ description, imageId }, i) => {
    products.push({
      id: (i + 1).toString(),
      name: formatFileName(imageId),
      description,
      price: parseFloat(faker.commerce.price({ min: 40, max: 200 })),
      imageId,
    });
  });

  products.forEach(async (product) => {
    await db.insert(productsTable).values(product).onConflictDoNothing();

    await index.upsert({
      id: product.id!,
      vector: await hfVectorize(`${product.name}: ${product.description}`),
      metadata: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageId: product.imageId,
      },
    });
  });
}

// 'dark_down_jacket_1.avif' -> 'Dark Down Jacket 1'
function formatFileName(fileName: string): string {
  // Remove everything after the first dot
  const nameWithoutExtension = fileName.replace(/\.[^.]*$/, "");
  // Remove everything after the last dot
  const nameWithoutFormatSpecifier = nameWithoutExtension.replace(
    /\.[^.]*$/,
    ""
  );

  const words = nameWithoutFormatSpecifier.split("_");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

main();
