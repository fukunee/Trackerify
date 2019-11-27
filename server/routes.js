const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');
const boardUserRoutes = require('./routes/boardUser');
const listRoutes = require('./routes/list');
const cardRoutes = require('./routes/card');
const cardUserRoutes = require('./routes/cardUser');
// const commentRoutes = require('./routes/comment');
// const labelRoutes = require('./routes/label');
// const attachmentRoutes = require('./routes/attachment');

module.exports = app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/board', boardRoutes);
  app.use('/api/board/user', boardUserRoutes);
  app.use('/api/list', listRoutes);
  app.use('/api/card', cardRoutes);
  app.use('/api/card/user', cardUserRoutes);
  // app.use('/api/comment', commentRoutes);
  // app.use('/api/label', labelRoutes);
  // app.use('/api/attachment', attachmentRoutes);
};
