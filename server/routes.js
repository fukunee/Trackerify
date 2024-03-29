const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/board');
const listRoutes = require('./routes/list');
const cardRoutes = require('./routes/card');
const commentRoutes = require('./routes/comment');
const labelRoutes = require('./routes/label');
const attachmentRoutes = require('./routes/attachment');
const userBoardRoutes = require('./routes/userBoard');
const userCardRoutes = require('./routes/userCard');

module.exports = app => {
  app.use('/api/auth', authRoutes);
  app.use('/api/board', boardRoutes);
  app.use('/api/list', listRoutes);
  app.use('/api/card', cardRoutes);
  app.use('/api/comment', commentRoutes);
  app.use('/api/label', labelRoutes);
  app.use('/api/attachment', attachmentRoutes);
  app.use('/api/board/user', userBoardRoutes);
  app.use('/api/card/user', userCardRoutes);
};
