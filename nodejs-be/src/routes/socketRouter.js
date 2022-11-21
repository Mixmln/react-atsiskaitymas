/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
const ProductSchema = require('../schemas/ProductSchema');

module.exports = (io) => {
  io.on('connect', (socket) => {
    socket.on('getProd', async (productId) => {
      const found = await ProductSchema.findOne({ productId });
      socket.emit('singleProd', found);
    });

    socket.on('updateTime', async () => {
      const allProducts = await ProductSchema.find();
      allProducts.forEach(async (product) => {
        const found = await ProductSchema.findOne({ productId: product.productId });
        await ProductSchema.findOneAndUpdate(
          { productId: product.productId },
          {
            $set: {
              time: found.time - 0.5,
            },
          }
        );
      });
      setTimeout(async () => {
        const updatedProducts = await ProductSchema.find();
        io.emit('updatedTimer', updatedProducts);
      }, 1000);
    });

    socket.on('joinTheRoom', ({ room }) => {
      socket.join(room);
    });

    socket.on('leaveTheRoom', (room) => {
      socket.leave(room);
    });

    socket.on('bid', async ({ productId, bid, bidFrom }) => {
      const bidObj = {
        bidFrom,
        bid,
      };

      await ProductSchema.findOneAndUpdate(
        { productId },
        {
          $push: {
            bids: bidObj,
          },
          $set: {
            currentPrice: Number(bid),
          },
        }
      );
      const found = await ProductSchema.findOne({ productId });
      const sortedBids = found.bids.sort((curBid, prevBid) => prevBid.bid - curBid.bid);
      await ProductSchema.findOneAndUpdate(
        { productId },
        {
          $set: {
            bids: sortedBids,
          },
        }
      );
      const foundToSend = await ProductSchema.findOne({ productId });
      io.in(productId).emit('updatedProduct', foundToSend);
    });
  });
};
