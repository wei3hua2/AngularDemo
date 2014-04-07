/**
 * Created by chongweiwahjames on 4/4/14.
 */
angular.module('angularDemoApp')
    .factory('Inbox', [function() {

        return {

        };
    }])
    .factory('Submenu',[function(){
        var cat = {
           main:'Main',
           client:'My Client',
           wonder:'My Wonder'
        };
        //client, adviser, manager, branch, higher - 11111

        var menu = [{name:'Client',category:cat['client'],role:3},
        {name:'Note',category:cat['client'],role:1},
        {name:'Custom',category:cat['client'],role:13}];


        return {
            getAllCategories: _.values(cat),
            getMenuItemsByCat: function(cat){
                return _.filter(menu,function(m){
                    return m.category==cat;
                });
            }
        }
    }]);
