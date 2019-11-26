const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  lists: [
    {
      title: {
        type: String,
        required: true,
        maxlength: 255
      },
      cards: [
        {
          title: {
            type: String,
            required: true,
            maxlength: 255
          },
          description: {
            type: String,
            required: false
          },
          labels: [
            {
              title: {
                type: String,
                required: true,
                maxlength: 255
              },
              color: {
                type: String,
                default: '#00c1e0'
              },
              created: {
                type: Date,
                default: Date.now
              }
            }
          ],
          assignedUsers: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
          ],
          comments: [
            {
              content: {
                type: String,
                required: true
              },
              user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
              },
              created: {
                type: Date,
                default: Date.now
              }
            }
          ],
          attachments: [
            {
              title: {
                type: String,
                required: true,
                maxlength: 255
              },
              user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
              },
              filepath: {
                type: String,
                required: true
              },
              created: {
                type: Date,
                default: Date.now
              }
            }
          ],
          created: {
            type: Date,
            default: Date.now
          }
        }
      ],
      created: {
        type: Date,
        default: Date.now
      },
      color: {
        type: String,
        default: '#00b6f3'
      }
    }
  ],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Board', BoardSchema);
