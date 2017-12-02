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
