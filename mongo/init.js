admin = db.getSiblingDB('admin');

admin.auth('root', 'secret')

user = db.getSiblingDB('assisten')

user.createUser({ user: 'dev', pwd: 'secretpass', roles: ['readWrite', 'dbAdmin'] })
