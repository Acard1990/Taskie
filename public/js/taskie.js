// var userTaskDiv = $('#myTasks');
// var pickedUpDiv = $('#pickedUp');
// var allTasksDiv = $('#allTasks');
//
// $.ajax({
//   url: '/profile/api/curr_user',
//   method: 'GET'
// }).then((response) => {
//   console.log(response);
//   for (var i=0; i<response.length; i++) {
//     if (response[i].UserId == id) {
//       let p = $(`<p>${response[i].description}</p>`);
//       userTaskDiv.append(p);
//     } else if (response[i].Assignment !== null && response[i].Assignment.UserId == id) {
//       let p = $(`<p>${response[i].description}</p>`);
//       pickedUpDiv.append(p);
//     } else {
//       let p = $(`<p>${response[i].description}</p>`);
//       let btn = (`<button class="pickUp" data-id="${response[i].id}">Pick Up</button>`);
//       p.append(btn);
//       allTasksDiv.append(p);
//     }
//   }
// });
//
// $(document).on('click', '.pickUp', function(event) {
//   event.preventDefault();
//   let id = $(this).data('id');
//   console.log(id);
//   $.ajax({
//     url: '/api/grab/task/' + id,
//     method: 'POST'
//   }).then((response) => {
//     console.log("Picked up");
//   });
// });

var taskie = {
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.render();
  },
  cacheDom: function() {
    this.$curUserTask = $('#myTasks');
    this.$curUserPickedUp = $('#pickedUp');
    this.$otherUserTasks = $('#allTasks');
    this.pickUp = $(`<button class="pickUp">Pick Up</button>`);
  },
  bindEvents: function() {
    this.pickUp.on('click', this.grabTask.bind(this));
    //this.pickUp.delegate('.pickUp', 'click', this.grabTask.bind(this));
  },
  render: function() {
    this.currUser();
    this.usersTasks();
    this.currUserAssignments();
  },
  getData: function(url, method, div, btn) {
    $.ajax({
      url: url,
      method: method
    }).done(response => {
      console.log(response);
      for (let i=0;i<response.length;i++) {
        if (response[i].description != null) {
          let p = $(`<p>${response[i].description}</p>`);
          $(btn).attr('data-id', response[i].id);
          p.append(btn);
          div.append(p);
        } else {
          let p = $(`<p>${response[i].Task.description}</p>`);
          $(btn).attr('data-id', response[i].id);
          p.append(btn);
          div.append(p);
        }
      }
    });
  },
  currUser: function() {
    this.getData('/profile/api/curr_user', 'GET', this.$curUserTask, '');
  },
  usersTasks: function() {
    this.getData('profile/api/other/tasks', 'GET', this.$otherUserTasks, this.pickUp);
  },
  currUserAssignments: function() {
    this.getData('/profile/api/curr_user/assignments', 'GET', this.$curUserPickedUp, '');
  },
  grabTask: function() {
    let taskId = this.pickUp.data('id');
    $.ajax({
      url: '/profile/api/grab/task/' + taskId,
      method: 'POST'
    }).then((response) => {
      console.log("Picked up");
    });
  }
};

taskie.init();

//
// var people = {
//     people: ['Will', 'Steve'],
//     init: function() {
//         this.cacheDom();
//         this.bindEvents();
//         this.render();
//     },
//     cacheDom: function() {
//         this.$el = $('#peopleModule');
//         this.$button = this.$el.find('button');
//         this.$input = this.$el.find('input');
//         this.$ul = this.$el.find('ul');
//         this.template = this.$el.find('#people-template').html();
//     },
//     bindEvents: function() {
//         this.$button.on('click', this.addPerson.bind(this));
//         this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));
//     },
//     render: function() {
//        var data = {
//            people: this.people,
//        };
//        this.$ul.html(Mustache.render(this.template, data));
//     },
//     addPerson: function() {
//         this.people.push(this.$input.val());
//         this.render();
//         this.$input.val('');
//     },
//     deletePerson: function(event) {
//         var $remove = $(event.target).closest('li');
//         var i = this.$ul.find('li').index($remove);
//
//         this.people.splice(i, 1);
//         this.render();
//     }
//
// };
//
// people.init();
