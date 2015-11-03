angular.module('ccac.services')
  .factory('MockData', function() {
    return {
      userData : function(cb) {
        var allUsers = [
          {
            firstName:'',
            lastName:'',
            avatar:'',
            profileName:'',
            dept:''

          },

          {
            firstName:'',
            lastName:'',
            avatar:'',
            profileName:'',
            dept:''

          },

          {
            firstName:'',
            lastName:'',
            avatar:'',
            profileName:'',
            dept:''
          }
        ];

        cb(allUsers);
      },
       nominations : function(cb) {
        var allNominations = [
          {
            id: '1',
            title:'The Best Mentor',
            hashTag:'#BestMentor',
            image:'http://36.media.tumblr.com/tumblr_mc61phQpLY1rjpkpko1_500.jpg',
            description:'Grizzly Bear is an American indie rock band from Brooklyn, New York, formed in 2002. The band consists of Edward Droste, Daniel Rossen, Chris Taylor and Christopher Bear.',
            nominee:'Jason Swett',
            nominator: 'Mike boweta',
            likes: ['user_id_1'],
            comments: []
          },
          
          {
            id: '2',
            title:'The Best Self Developer',
            hashTag:'#BestSelfDeveloper',
            image:'http://41.media.tumblr.com/tumblr_m4a98wn8LG1rq171wo1_500.jpg',
            description:'Michael Chase is a self-taught photographer and fine arts student. He’s recently been featured on Tumblr’s spotlight and we really love his work.',
            nominee:'Michael Chase',
            nominator: 'tommie Durotola',
            likes: ['user_id_1','user_id_5','user_id_4','user_id_3','user_id_2'],
            comments: []
          },

          {
            id: '3',
            title:'The Night Owl',
            hashTag:'#NightOwl',
            image:'http://40.media.tumblr.com/tumblr_m92hvoG4eu1rp9uz4o1_500.jpg',
            description:'Desire is caught in the logic of “this is not that,” while love as authentic sublimation fully accepts that “this is that”.',
            nominee:'Lana Del Ray',
            nominator: 'Grizzly Bear',
            likes: ['user_id_1','user_id_3','user_id_2'],
            comments: []
          },

          {
            id: '4',
            title:'The Night Owl',
            hashTag:'#NightOwl',
            image:'http://41.media.tumblr.com/tumblr_m98ojl25pD1qfjsvao1_1280.jpg',
            description:'Aidan Knight (born October 23, 1986) is a Victoria-based songwriter and namesake for Canadian experimental folk band, Aidan Knight. Knight has also performed and recorded with The Zolas, Hannah Georgas, Dan Mangan, and We Are the City.',
            nominee:'Aidan Knight',
            nominator: 'Lana Del Ray',
            likes: ['user_id_1','user_id_3','user_id_2'],
            comments: []
          },

          {
            id: '5',
            title:'The Night Owl',
            hashTag:'#NightOwl',
            image:'http://40.media.tumblr.com/tumblr_mb8b9oelMS1qfjsvao1_500.jpg',
            description:'Brian is a Victoria-based photographer. He is also our friend. He takes amazing photographers of amazing people. Most of the time these people are either engaged in matrimony or music making. You really ought to check him out.',
            nominee:'Lana Del Ray',
            nominator: 'Grizzly Bear',
            likes: ['user_id_1','user_id_3','user_id_2'],
            comments: []
          },
          {
            id: '6',
            title:'The Sea Fish',
            hashTag:'#SeaFish',
            image:'http://i.imgur.com/bAZWoqx.jpg',
            description:'Cobby is a Florida-based swimmer. He is also our friend. He takes amazing photographs of swimming people. Most of the time these people are either engaged acting or music making.',
            nominator: 'Gaskins Cray',
            likes: ['user_id_1','user_id_3','user_id_2','user_id_5'],
            comments: []
          }
        ];

        cb(allNominations);
      }
  }
});