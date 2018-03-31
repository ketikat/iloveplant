/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Order, Category, Review, Product, OrderItem} = require('../server/db/models')

const users = [
  {email: 'hkwweber@gmail.com',
    name: 'Hannah Weber',
    password: 'plant',
    address: '5 Hanover Square'},
  {email: 'katballo@gmail.com',
    name: 'Kat Ballo',
    password: 'plant',
    address: '5 Hanover Square',
    isAdmin: true},
  {email: 'kathy@kathy.com',
    name: 'Kathy Chun',
    password: 'plant',
    address: '5 Hanover Square'},
  {email: 'ann@heyann.com',
    name: 'Ann Layman',
    password: 'plant',
    address: '5 Times Square',
    isAdmin: true}
];

const products = [
{name: 'BIRD OF PARADISE',
   species: 'STRELITZIA REGINAE',
   price: 65,
   inventory: 12,
   description: "Placing a Bird of Paradise Plant close to a south- facing window is always best. A Bird of Paradise Plant is susceptible to pests. Fortunately these plant pests are quickly detected on the large broad leaves and are easily wiped off with a soft cloth or warm soapy water. Alcohol, leaf shine, or any spray pesticide should never be used on the leaves of a Bird of Paradise, they harm the matte finish on the leaves. A 3'-4' Bird of Paradise Plant is usually available in 10-inch pots. A 5'-7' Bird of paradise Plant comes in a 14-inch pot. Cut off any dead or damaged leaves and stems as close to the root clump of a Bird of Paradise Plant as you can.The easiest way to propagate a Bird of Paradise Plant is by plant division.",
   image: 'images/bird_of_paradise.jpg'
  },
{name: 'AFRICAN MASK ELEPHANT EAR PLANT',
   species: 'ALOCASIA POLLY',
   price: 45,
   inventory: 12,
   description: "Native to South Africa, the Asparagus Fern is not a true fern at all but rather member of the Lily Family. Asparagus Ferns grow best in coming from an East, West, or North-facing window. Asparagus Ferns are propagated by plant division. The best time to propagate an Asparagus Fern is in the spring before it starts producing new growth. The root ball of an Asparagus Fern is often very difficult to divide, so have plenty of strong tools available.An Asparagus Fern, like many tropical plants, rests during the cooler months. Asparagus ferns need very little water during this dormant period.",
   image: 'images/AFRICAN_MASK_ELEPHANT_EAR_PLANT.jpg'
  },
{name: 'CLIMBING ASPARAGUS FERN',
   species: 'ASPARAGUS PLUMOSUS',
   price: 45,
   inventory: 12,
   description: "Native to South Africa, the Asparagus Fern is not a true fern at all but rather member of the Lily Family. Asparagus Ferns grow best in coming from an East, West, or North-facing window. Asparagus Ferns are propagated by plant division. The best time to propagate an Asparagus Fern is in the spring before it starts producing new growth. The root ball of an Asparagus Fern is often very difficult to divide, so have plenty of strong tools available.An Asparagus Fern, like many tropical plants, rests during the cooler months. Asparagus ferns need very little water during this dormant period.",
   image: 'images/CLIMBING_ASPARAGUS_FERN.jpg'
  },
{name: 'JADE PLANT',
   species: 'CRASSULA OVATA',
   price: 12,
   inventory: 12,
   description: "A jade plant is native to the dry hills of South Africa, so it is very drought resistant. This plant needs very bright light. Some jade plant varieties develop red edges on their leaves when exposed to bright sunlight. Typically, all healthy, mature Jades will bloom, usually around Christmas in the northern hemisphere. Their blooming is triggered by the natural shortening of the daylight hours. If your Jade Tree is in a room that usually has lights turned on at night, it will more than likely fail to bloom for you. Jade plants are easily propagated by leaf and stem cuttings. Allow the stem or leaf to sit out over night before using it for propagation. Remove a leaf or several from the plant. Using a small 4-inch pot with a loose quick draining soil, lay the leaf onto the soil or insert the stem into the soil. Water the potting mixture and then water sparingly until the leaf puts out roots. Placing the plant in a clear plastic bag increases the humidity and helps the leaves root faster.",
   image: 'images/jade.jpg'
    },
{name: 'BABY RUBBER TREE',
   species: 'PEPEROMIA OBTUSIFOLIA',
   price: 8,
   inventory: 12,
   description: "All Peperomia Plants, which belong to the Pepper Family, are semi-succulents, with very similar care requirements. The leaves, thick and plump, rippled, smooth, or shiny, can be various shades of green, red, gray, and cream. The pattern on the leaves may be marbled, striped, or a solid color. Peperomia flowers are tiny and inconsequential, growing in clusters on upright conical spikes. Mature Peperomia houseplants never grow taller than 12”-18 and are ideal for tables. There are even some varieties make excellent hanging plants. The most popular varieties used as houseplants are the caperata and the obtusifolia varieties. These plants even grow under fluorescent lights. Insufficient light causes the slow growing peperomia plant to stop growing all together. Direct sunlight burns the leaves. The thick leaves of Peperomia Plants hold water and allow the plant to withstand long periods without moisture. Peperomia plants are originally from the rain forests of Brazil and like a warm humid environment. Peperomia plants can be pruned anywhere along the stem. New growth develops from the nodes just below the cut in the stem.  Can easily be propagated from leaf cuttings, stem tip cuttings, and plant division. Be sure to allow the cut ends of the leaves or stems to dry out for several hours or overnight before planting them.",
   image: 'images/baby_rubber_tree.jpg'
    },
{name: 'PRAYER PLANT',
   species: 'MARANTA LEUCONEURA',
   price: 12,
   inventory: 12,
   description: "The Prayer plant, native to Brazil. Asia, and Africa, is a very unique plant.  Prayer plants do well in medium to bright light but no direct sun. When there is not enough light, the leaves close at night and do not fully open during the day. When a Prayer plant gets too much light, the color in the leaves starts to fade. A Prayer plant likes a very humid environment, and the humidity in ours homes is often too low. Increase the humidity by grouping plants together, putting a small humidifier or bowl of water near the plant, or setting a Prayer plant on a tray filled with water and small stones. Be sure the plant is sitting on the pebbles and not in the water. A Prayer plant is propagated by plant division and stem cuttings",
   image: 'images/prayer_plant.jpg'
    },
  {name: 'POTHOS',
   species: 'EPIPREMNUM AUREUM',
   price: 9,
   inventory: 12,
   description: "The Marble Queen Pothos is a popular plant in the hardy Pothos Family. All members of this group have glossy, heart-shaped, leathery leaves but in different colors. The Golden Pothos is yellow and green, the Jade Pothos is solid green, and the Marble Queen Pothos is green and white. The Marble Queen Pothos, with its long cascading vines, makes a beautiful table or hanging plant. This plant can also be trained to grow on a pole or trellis. A Marble Queen Pothos can survive in low light, but looks better and grows faster in medium to bright light. If the light is too low, the white swirls on the leaves revert to green on the new growth.",
   image: 'images/pothos.jpg'
    },
   {name: 'ALOE VERA',
     species:'ALOE BARBADENSIS',
     price: 7,
     inventory: 26,
     description: "Aloe Vera Plants can grow in almost any type of soil, but a quick draining well-aerated soil with some sand in it is best for these plants. A commercial Cactus potting soil also works well.  Keep an Aloe Vera Plant in a small pot with drip holes in the bottom. This allows the soil to quickly dry-out and prevents root rot. Although the sap of an Aloe Vera Plant is highly recommended for treating burns, other parts of an Aloe Vera Plant are toxic.",
     image: 'images/aloe_vera.jpg'
    },
   {name: 'MONEY TREE',
   species: 'PACHIRA AQUATICA',
   price: 55,
   inventory: 9,
   description: 'Originally came from the wetlands in Central and South America and became very popular in Taiwan in the 1980’s. Pachira aquatica usually has a central trunk made up of three, five, or seven stems that are often braided together.  This plant even does well under fluorescent lights.  A Pachira aquatica likes high humidity. If your home or office is dry, place it on a wet pebble tray to increase the humidity. Be sure the plant is sitting on the peeves and not in the water.  If you want the plant to grow larger, repot as soon as the roots have filled the existing container. Cut off a few of the larger leaves from the bottom of a Money Tree Plant each month to encourage new growth at the top.  The easiest ways to propagate an indoor Money Tree are by stem cuttings.',
   image: 'images/money_tree.jpg'
    },
    {name: 'PENCIL CACTUS',
   species: 'EUPHORBIA TIRUCALLI',
   price: 7,
   inventory: 15,
   description: 'Not a cactus plant at all but rather a member of the Euphorbia family, like a Poinsettia. This unique looking plant, native to Africa and India, is also referred to as Indian Tree Spurge, Naked Lady Plant, Aveloz, Milk Bush Plant, and Petroleum Plant.',
   image: 'images/pencil_cactus.jpg'
    },
    {name: 'TREE PHILODENDRON',
    species: 'PHILODENDRON SELLOUM',
    price: 35,
    inventory: 41,
    description: 'Native to South America, but also grows outdoors on the East and Gulf coasts of the United States. Indoors, the easy-care, self-heading Philodendron Selloum takes up a lot of space, often spreading 5ft. or more with 2ft.-3ft. leaves. The dark green, shiny leaves are large and deeply lobed. A Selloum does grow a trunk as it matures, but the huge drooping leaves usually hide it. A Philodendron Selloum grows well in bright indirect light. In lower light, the leaves turn a darker green; direct sun or too much light burns or fades the leaves. Propagate a Philodendron Selloum from stem cuttings. Dip the cut end of the stem in a little rooting hormone to increase the chance of success.',
    image: 'images/TREE_PHILODENDRON.jpg'
    },
    {name: 'MAJESTY PALM',
    species: 'RAVENEA RIVULARIS',
    price: 35,
    inventory: 30,
    description: 'They are a challenge to take care of and are not very forgiving. Majesty Palms, native to Madagascar, do extremely well in rain forests, swamps, or outdoors in places like Florida. Indoors Majesty Palms often struggle to survive A Majesty Palm needs very bright indirect at all times. One of the reasons the fronds of a Majesty Palm turn yellow is that there is not enough light. A Majesty Palm requires a great deal of fertilizer. Not enough plant food is another reason why a Majesty palm gets yellow leaves. Feed a Majesty Palm every two weeks when the plant is actively growing with a balanced houseplant food at 1/2 the recommended strength.',
    image: 'images/majesty_palm.jpg'
    }
]

const categories = [
  {name: 'Small'},
  {name: 'Medium'},
  {name: 'Large'},
  {name: 'Low Light',
  description: 'Best in non-South facing window. Will also survive in shady corners.'},
  {name: 'Medium Light',
  description: 'Survives in any window, really.'},
  {name: 'High Light',
  description: 'Best in South-facing window.'}
]

const orders = [
  {orderStatus: 'Created', userId: '1', orderEmail: 'hkwweber@gmail.com', orderAddress: '5 Hanover Square'},
  {orderStatus: 'Processing', userId: '2', orderEmail: 'kat@gmail.com', orderAddress: '45 Stewart Ave'},
  {orderStatus: 'Cancelled', userId: '1', orderEmail: 'hkwweber@gmail.com', orderAddress: '5 Hanover Square'},
  {orderStatus: 'Completed', userId: '1', orderEmail: 'hkwweber@gmail.com', orderAddress: '5 Hanover Square'}
]

const reviews = [
// 1bird
  {content: 'this was a great additon to our office', rating: 5, productId: 1, userId: 1},
    {content: 'these grow like weeds in LA, but still a very beautiful plant', rating: 4, productId: 1, userId: 2},
// 2elephant ear
 {content: 'Kind of hard to maintain. This plant is picky', rating: 3, productId: 2, userId: 4},
 {content: 'very neat pattern on the leaves!', rating: 4, productId: 2, userId: 4},
// 3jade
  {content: 'So easy to take care of!', rating: 4, productId: 3, userId: 4},
// 4climbing fenn
  {content: 'what a gorgeous plant! Mine loves the humidity in our bathroom', rating: 4, productId: 4, userId: 4},
  {content: 'What a cool plant!', rating: 5, productId: 4, userId: 3},
// 5baby rubber
  {content: 'great little plant. easy', rating: 5, productId: 5, userId: 1},
// 6prayer_plant
  {content: 'this plant is always thirsty', rating: 3, productId: 6, userId: 2},
// 7pothos
  {content: 'lovely for hanging in a window', rating: 5, productId: 7, userId: 1},
// 8aloe_vera
  {content: 'classic beauty', rating: 5, productId: 8, userId: 1},
  {content: 'I love my Aloe <3', rating: 5, productId: 8, userId: 2},
// 9money_tree
  {content: 'Gorgeous and easy to care for! What more could you want?', rating: 5, productId: 9, userId: 4},
// 10pencil_cactus
  {content: 'very cool looking!', rating: 4, productId: 10, userId: 4},
  {content: 'i love this guy!', rating: 5, productId: 10, userId: 1},
// 12majesty_palm
  {content: 'this plant died on me right away', rating: 1, productId: 12, userId: 4},
// 11TREE_PHILODENDRON
  {content: 'this plant is so easy to care for, and keeps growing new tendrils every week!', rating: 5, productId: 11, userId: 4},

  {content: 'WOW what a plant!', rating: 5, productId: 11, userId: 3}
]

const orderItemData = [
  {priceAtPurchase: 5, quantity: 3, productId: 2, orderId: 2},
  {priceAtPurchase: 5, quantity: 1, productId: 1, orderId: 3},
  {priceAtPurchase: 10, quantity: 1, productId: 1, orderId: 4},
  {priceAtPurchase: 4, quantity: 1, productId: 2, orderId: 4}
]

function prodCat () {
  return Product.findById(1)
  .then(found => {
    return found.setCategories([3,5,6])
    })
  .then(() => {
    return Product.findById(2)
    .then(found2 => {
      return found2.setCategories([1,2,4])
    })
  })
  .then(() => {
    return Product.findById(3)
    .then(found3 => {
      return found3.setCategories([1,5,6])
    })
  })
  .then(() => {
    return Product.findById(4)
    .then(found2 => {
      return found2.setCategories([3,5,6])
    })
  })
  .then(() => {
    return Product.findById(5)
    .then(found2 => {
      return found2.setCategories([1,2,4,5,6])
    })
  })
  .then(() => {
    return Product.findById(6)
    .then(found2 => {
      return found2.setCategories([1,4,5])
    })
  })

  .then(() => {
    return Product.findById(7)
    .then(found2 => {
      return found2.setCategories([2,4,5,6])
    })
  })
  .then(() => {
    return Product.findById(8)
    .then(found2 => {
      return found2.setCategories([1,4,5,6])
    })
  })
  .then(() => {
    return Product.findById(9)
    .then(found2 => {
      return found2.setCategories([2,3,4,5,6])
    })
  })
  .then(() => {
    return Product.findById(10)
    .then(found2 => {
      return found2.setCategories([1,5,6])
    })
  })
  .then(() => {
    return Product.findById(11)
    .then(found2 => {
      return found2.setCategories([3,4,5,6])
    })
  })
  .then(() => {
    return Product.findById(12)
    .then(found2 => {
      return found2.setCategories([3,6])
    })
  })
  }



const seed = () => {
  return Promise.all(users.map(user => User.create(user))
  )
  .then(() =>
    Promise.all(products.map(product => Product.create(product))
  ))
  .then(() =>
    Promise.all(categories.map(category => Category.create(category))
  ))
  .then(() =>
    Promise.all(orders.map(order => Order.create(order))
  ))
  .then(() =>
    Promise.all(reviews.map(review => Review.create(review))
  ))
  .then(() =>
    Promise.all(orderItemData.map(orderItemEntry => OrderItem.create(orderItemEntry))
  ))
}


const main = () => {
  console.log('syncing db');
  db.sync({force: true})
  .then(() => {
    console.log('seeding')
    return seed()
  })
  .then(() => {
    return prodCat()
  })
  .catch(err => {
    console.log('Error while seeding')
    console.log(err.stack)
  })
  .then(()=> {
    db.close();
    return null;
  })
}

main();
