/**
 * Created with JetBrains WebStorm.
 * User: Gao
 * Date: 13-5-13
 * Time: 下午11:06
 * To change this template use File | Settings | File Templates.
 */
define(['lodash','backbone'],function(_,Backbone){
    var UserModel = Backbone.Model.extend({
        'url' : '/user/registry',
        'idAttribute' : "_id",
        'initialize': function(attr, opt){
            this.fetch();
        },
        validate: function(attr, options) {
            if (this.checkEmail(attr.email))
                return this.checkEmail(attr.email);
            if (this.checkPasswd(attr.passwd))
                return this.checkPasswd(attr.passwd);
        },
        checkEmail: function(email) {
            if (!email) {
                return 'Pleace enter your email!';
            } else if (! (/.+@[a-z0-9-\.]+\.[a-z]/i.test(email)) ) {
                return 'Your email is not allowed!'
            } else {
                return null;
            }
        },
        checkPasswd: function(passwd) {
            if (passwd.length < 6) {
                return 'Your password\'s length mast great than 6';
            }
        },
        parse: function(data) {
            this.registryInfo = data.message;
            if (data.status === 1) {
                this.trigger('success');
                return null;
            } else if (data.status === 0) {
                this.trigger('error.reg');
                return null;
            } else {
                this.trigger('gohome');
                return null;
            }
        }

    });
    return UserModel;
})
