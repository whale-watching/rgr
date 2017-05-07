import { MongoClient } from 'mongodb';

export default {
  db: null,
  connect(url, done) {
    if (this.db) {
      return done();
    }

    MongoClient.connect(url, (err, db) => {
      if (err) {
        done(err);
      }

      this.db = db;
      done(err, db);
    });
  },
  terminate(done) {
    if (this.db) {
      this.db.close((err, result) => {
        if (err) {
          done(err);
        }

        this.db = null;
        done(err, result);
      });
    }
  },
  get() {
    return this.db;
  },
};
