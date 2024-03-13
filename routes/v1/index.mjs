// routes/index.mjs

import express from 'express';
import authRoute from './auth.route.mjs';
import userRoute from './user.route.mjs';
// import adminRoute from './admin.route.mjs';
// import cartRoute from './cart.route.mjs';
import couponRoute from './coupon.route.mjs';
// import favouriteRoute from './favourite.route.mjs';
// import orderRoute from './order.route.mjs';
// import paymentRoute from './payment.route.mjs';
import productRoute from './product.route.mjs';
import promotionRoute from './promotion.route.mjs';
// import reviewRoute from './review.route.mjs';
// import testimonialRoute from './testimonial.route.mjs';
import docsRoute from './docs.route.mjs';
import config from '../../config/config.mjs';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  // {
  //   path: '/admin',
  //   route: adminRoute,
  // },
  // {
  //   path: '/cart',
  //   route: cartRoute,
  // },
  {
    path: '/coupon',
    route: couponRoute,
  },
  // {
  //   path: '/favourite',
  //   route: favouriteRoute,
  // },
  // {
  //   path: '/order',
  //   route: orderRoute,
  // },
  // {
  //   path: '/payment',
  //   route: paymentRoute,
  // },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/promotion',
    route: promotionRoute,
  },
  // {
  //   path: '/review',
  //   route: reviewRoute,
  // },
  // {
  //   path: '/testimonial',
  //   route: testimonialRoute,
  // },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach(({ path, route }) => {
    router.use(path, route);
  });
}

export default router;