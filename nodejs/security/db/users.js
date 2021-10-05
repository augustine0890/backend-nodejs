const db = require('./database');
var bccrypt = require('bcryptjs');

const register = async (username, fullname, password, email, done) => {
  const t = await db.sequelize.transaction();
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    var user = await db.models.user.create({
      Username: username,
      PasswordHash: hash,
      Salt: salt,
      Email: email
    }, { transaction: t });

    var userProfile = await db.models.profile.create({
      FullName: fullname,
      User_Id: user.Id,
      LastAccess: new Date()
    }, { transaction: t });

    await t.commit();
    done(null, {user:user,profile:userProfile});

  } catch(e) {            
    console.log(e);
    await t.rollback();
    done(e);
  }
}

const findById = async (id, done) => {  
  try {
    var user = await db.models.user.findByPk(id, {raw : true });

    done(null, user);    
  } catch(e) {            
    console.log(e);
    done(e, null); 
  }
};


const findByUsername = async (username, done) => {  
  try {
    var condition = { Username: username };
    var user = await db.models.user.findOne({ where: condition, raw : true } );

    done(null, user);    
  } catch(e) {            
    console.log(e);
    done(e, null); 
  }
};

const findByEmail = async (email, done) => {  
  try {
    var condition = { Email: email };
    var user = await db.models.user.findOne({ where: condition, raw : true } );

    done(null, user);    
  } catch(e) {            
    console.log(e);
    done(e, null); 
  }
};

const getProfile = async (username, done) => {
  try {     
    var condition = {Username: username};
    var user = await db.models.user.findOne({ where: condition, raw: true  });
    var profile = await db.models.profile.findOne({ where: {User_Id: user.Id}, raw: true });

    var ret = {
      Id: user.Id,
      FullName: profile.FullName,
      Email: user.Email
    };
    done(null, ret);

  } catch(e) {            
    console.log(e);
    done(e, null);
  }
}

const updateUser = async (usr, done) => {  
  try {
    var condition = {Id: usr.Id};
    db.models.user.update(usr,{ where: condition})
      .then(num => {
        done(null, true); 

      }); 
  } catch(e) {            
    console.log(e);
    done(e, null); 
  }
};

const updateUserAccess = async (user, done) => {  
  try {
    var condition = {User_Id: user.User_Id};
    db.models.profile.update(user,{ where: condition})
      .then(num => {
        done(null, true); 

      }); 
  } catch(e) {            
    console.log(e);
    done(e, null); 
  }
};


export default {
  register,
  findById,
  findByUsername,
  findByEmail,
  getProfile,
  updateUser,
  updateUserAccess,
}
