import { creatorPhotos } from './creator-content';

export type PhotoAsset = {
  src: string;
  alt: string;
  author: string | null;
  sourceUrl: string;
  originalUrl: string;
  license: string;
  licenseUrl: string;
  video?: {
    creatorId: string;
    authorUrl: string;
    title: string;
    publishedAt: string;
    frameSeconds: number;
    capturedAt: string;
    context: string;
  };
};

// Unknown authors remain null; source links retain the original photo identifiers.
export const photoAssets: Record<string, PhotoAsset> = {
  ...creatorPhotos,
  "editorialKnit": {
    "src": "/images/editorial-5.jpg",
    "alt": "穿着驼白几何针织、米白短裤与棕色长靴的人站在湖边",
    "author": null,
    "sourceUrl": "https://images.unsplash.com/photo-1475180098004-ca77a66827be",
    "originalUrl": "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1200&q=85",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license"
  },
  "editorialCoat": {
    "src": "/images/editorial-1.jpg",
    "alt": "穿着酒红外套、浅色高领内搭的人手提购物袋",
    "author": null,
    "sourceUrl": "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    "originalUrl": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license"
  },
  "editorialRed": {
    "src": "/images/editorial-2.jpg",
    "alt": "穿着红色宽松长卫衣的人站在灰白墙前，腿部露出",
    "author": null,
    "sourceUrl": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
    "originalUrl": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license"
  },
  "navyWhite": {
    "src": "/images/navy-white.jpg",
    "alt": "穿着深藏青无袖上衣与米白长裤的人站在浅色墙前",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/15302314/",
    "originalUrl": "https://images.pexels.com/photos/15302314/pexels-photo-15302314.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "highWaist": {
    "src": "/images/high-waist.jpg",
    "alt": "白色打结短上衣与棕色高腰长裤的腰部近景",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/7043252/",
    "originalUrl": "https://images.pexels.com/photos/7043252/pexels-photo-7043252.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "volumeBalance": {
    "src": "/images/volume-balance.jpg",
    "alt": "穿着宽松橄榄绿衬衫与米白阔腿裤的人正面站立",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/18532851/",
    "originalUrl": "https://images.pexels.com/photos/18532851/free-photo-of-young-fashionable-woman-posing-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "shirtBoots": {
    "src": "/images/shirt-loafers.jpg",
    "alt": "穿着宽松白衬衫和黑色短靴的人蹲在窗边",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/17974368/",
    "originalUrl": "https://images.pexels.com/photos/17974368/pexels-photo-17974368.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "teeCanvas": {
    "src": "/images/tee-sneakers.jpg",
    "alt": "穿着印花T恤、格纹衬衫、深色裤装与高帮帆布鞋的人坐在椅上",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/11931378/",
    "originalUrl": "https://images.pexels.com/photos/11931378/pexels-photo-11931378.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "shirtLoafers": {
    "src": "/images/straight-trousers.jpg",
    "alt": "穿着白衬衫、黑色窄直长裤与黑色乐福鞋的人将外套搭在肩上",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/28938770/",
    "originalUrl": "https://images.pexels.com/photos/28938770/pexels-photo-28938770.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "coffeeTop": {
    "src": "/images/deep-coffee.jpg",
    "alt": "穿着暖棕色T恤与灰色裤装的人站在浅色背景前",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/6311615/",
    "originalUrl": "https://images.pexels.com/photos/6311615/pexels-photo-6311615.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "whiteSneakers": {
    "src": "/images/light-sneakers.jpg",
    "alt": "身穿黑色上衣与黑色长裤的人搭配白色高帮运动鞋，背景有彩色灯光",
    "author": null,
    "sourceUrl": "https://images.unsplash.com/photo-1600258711855-73aa22de1a9c",
    "originalUrl": "https://images.unsplash.com/photo-1600258711855-73aa22de1a9c?auto=format&fit=crop&w=1600&q=82",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license"
  },
  "neutralCoat": {
    "src": "/images/warm-neutral.jpg",
    "alt": "穿着米色长外套的人背对镜头，肩上有棕色挎包",
    "author": null,
    "sourceUrl": "https://images.unsplash.com/photo-1605204631224-6107b31a5efa",
    "originalUrl": "https://images.unsplash.com/photo-1605204631224-6107b31a5efa?auto=format&fit=crop&w=1600&q=82",
    "license": "Unsplash License",
    "licenseUrl": "https://unsplash.com/license"
  },
  "cropStraight": {
    "src": "/images/crop-straight.jpg",
    "alt": "白色短款无袖上衣、米色高腰直筒九分裤与黑色凉鞋的全身穿着",
    "author": "Layanne Aguiar",
    "sourceUrl": "https://www.pexels.com/photo/woman-wearing-a-white-crop-top-and-pants-26976221/",
    "originalUrl": "https://images.pexels.com/photos/26976221/pexels-photo-26976221.jpeg",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "teeTailored": {
    "src": "/images/tee-tailored-sneakers.jpg",
    "alt": "坐在矮墙上的人穿深色T恤、灰色格纹窄直裤与白色低帮运动鞋",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/8255086/",
    "originalUrl": "https://images.pexels.com/photos/8255086/pexels-photo-8255086.jpeg",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "lightLowSneakers": {
    "src": "/images/white-tee-sneakers.jpg",
    "alt": "坐在木凳上的人穿白色T恤、黑色九分裤与白色低帮运动鞋，手中拿着蓝色鞋",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/3737922/",
    "originalUrl": "https://images.pexels.com/photos/3737922/pexels-photo-3737922.jpeg",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  },
  "deepCoffeeShirt": {
    "src": "/images/coffee-shirt.jpg",
    "alt": "穿深棕色长袖衬衫、浅米色长裤与白色运动鞋的人站在暖色背景前",
    "author": null,
    "sourceUrl": "https://www.pexels.com/photo/19456444/",
    "originalUrl": "https://images.pexels.com/photos/19456444/pexels-photo-19456444.jpeg",
    "license": "Pexels License",
    "licenseUrl": "https://www.pexels.com/license/"
  }
};
