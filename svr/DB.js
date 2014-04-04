/**
 * Created by James on 4/4/14.
 */

var _ = require('underscore');


module.exports = {
    findByUsername : function (username) {
        return _.findWhere(MOCK_USER,{username:username});
    },
    updateUserToken : function (username, token) {
        var user = _.findWhere(MOCK_USER,{username:username});
        user.token = token;
        return user.token;
    },
    findByToken : function (token) {
        try{
            return _.chain(MOCK_USER).findWhere({token:token}).pick('username','email').value();
        } catch(err){
        }
    }
}



var MOCK_USER = [
    {username:'admin',email:'email@admin.com',password:'password',token:''},
    {username:'jameschong',email:'email@jameschong.me',password:'jameschong',token:''},
    {username:'johndoe',email:'johndoe@gmail.com',password:'whymeagain',token:''}
];